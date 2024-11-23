import { useState } from "react";
import { storage } from "../../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function useStorageUpload() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  function uploadFile(path, file, options = {}) {
    const { onProgress } = options; // 콜백 전달
    return new Promise((resolve, reject) => {
      setLoading(true);
      setProgress(0);
      setError(null);

      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          if (onProgress) {
            onProgress(progress); // 프로그레스 콜백 호출
          }
        },
        (error) => {
          setError(error);
          setLoading(false);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setLoading(false);
            resolve({ url, path });
          } catch (error) {
            setError(error);
            setLoading(false);
            reject(error);
          }
        }
      );
    });
  }

  return {
    loading,
    progress,
    error,
    uploadFile,
  };
}
