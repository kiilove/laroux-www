import { useState } from "react";
import { useStorageUpload } from "../useStorage/index";
import { useStorageDownload } from "../useStorage/index";

export const useImageHandler = (initialImages = [], uploadPath = "default") => {
  const [images, setImages] = useState(initialImages);
  const [tempImages, setTempImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { uploadFile } = useStorageUpload();
  const { deleteFile } = useStorageDownload();

  // 이미지 추가 핸들러
  const handleAdd = (files) => setTempImages((prev) => [...prev, ...files]);

  // 이미지 삭제 핸들러
  const handleRemove = (index, isExisting = false) => {
    if (isExisting) {
      setDeletedImages((prev) => [...prev, images[index]]);
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setTempImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Firebase Storage에서 삭제 처리
  const deleteFromStorage = async () => {
    for (const url of deletedImages) {
      try {
        const path = decodeURIComponent(url.split("/").pop().split("?")[0]);
        await deleteFile(path);
        console.log(`Storage에서 삭제 완료: ${path}`);
      } catch (error) {
        console.error(`Storage 삭제 실패: ${url}`, error);
      }
    }
  };

  // 업로드 및 URL 병합
  const processImages = async () => {
    setIsUploading(true);
    const uploadedImages = [];

    try {
      // 새 파일 업로드
      for (const file of tempImages) {
        const path = `${uploadPath}/${file.name}`;
        const { url } = await uploadFile(path, file, {
          onProgress: (progress) => setUploadProgress(progress),
        });
        uploadedImages.push(url);
      }

      // 삭제 처리
      await deleteFromStorage();

      // 최종 이미지 병합
      const finalImages = [...images, ...uploadedImages].filter(
        (url) => !deletedImages.includes(url)
      );

      // 상태 정리
      setImages(finalImages);
      setTempImages([]); // 업로드 완료 후 초기화
      setDeletedImages([]); // 삭제 완료 후 초기화
      return finalImages;
    } catch (error) {
      console.error("이미지 처리 실패:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    images,
    tempImages,
    deletedImages,
    isUploading,
    uploadProgress,
    handleAdd,
    handleRemove,
    processImages,
  };
};
