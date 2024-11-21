import { useState } from "react";
import { storage } from "../../services/firebase";
import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";

export function useStorageDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getFileUrl(path) {
    setLoading(true);
    try {
      const url = await getDownloadURL(ref(storage, path));
      return url;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function listFiles(path) {
    setLoading(true);
    try {
      const listRef = ref(storage, path);
      const res = await listAll(listRef);
      const files = await Promise.all(
        res.items.map(async (itemRef) => ({
          name: itemRef.name,
          path: itemRef.fullPath,
          url: await getDownloadURL(itemRef),
        }))
      );
      return files;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deleteFile(path) {
    setLoading(true);
    try {
      await deleteObject(ref(storage, path));
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getFileUrl,
    listFiles,
    deleteFile,
  };
}
