import { useState } from "react";
import { rtdb } from "../../services/firebase";
import { ref, set, push, remove, get } from "firebase/database";

export function useRealtimeDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData(path) {
    setLoading(true);
    try {
      const snapshot = await get(ref(rtdb, path));
      return snapshot.val();
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function setData(path, data) {
    setLoading(true);
    try {
      await set(ref(rtdb, path), data);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function pushData(path, data) {
    setLoading(true);
    try {
      const newRef = push(ref(rtdb, path));
      await set(newRef, data);
      return { id: newRef.key, ...data };
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function removeData(path) {
    setLoading(true);
    try {
      await remove(ref(rtdb, path));
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
    getData,
    setData,
    pushData,
    removeData,
  };
}
