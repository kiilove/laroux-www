import { useState } from "react";
import { storage } from "../../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function useStorageUpload() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  function uploadFile(path, file, metadata = null) {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setProgress(0);
      setError(null);

      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
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
