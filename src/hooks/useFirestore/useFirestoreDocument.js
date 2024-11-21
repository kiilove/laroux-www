import { useState } from "react"; // React의 상태 관리 훅
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Firestore 관련 메서드
import { db } from "../../services/firebase"; // Firebase 초기화 파일

export function useFirestoreGetDocument() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDocument(collectionName, id, callback = null) {
    try {
      setLoading(true);
      setError(null);
      const docSnapshot = await getDoc(doc(db, collectionName, id));
      if (docSnapshot.exists()) {
        const documentData = { id: docSnapshot.id, ...docSnapshot.data() };
        setData(documentData);
        if (callback) callback(documentData);
      } else {
        setError("Document does not exist");
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    getDocument,
  };
}

export function useFirestoreAddData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addData(collectionName, newData, callback = null) {
    try {
      setLoading(true);
      setError(null);
      const docRef = await addDoc(collection(db, collectionName), newData);
      const addedData = { ...newData, id: docRef.id };
      setData(addedData);
      if (callback) callback(addedData);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, addData };
}

export function useFirestoreUpdateData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateData(collectionName, id, newData, callback = null) {
    try {
      setLoading(true);
      setError(null);
      await updateDoc(doc(db, collectionName, id), newData);
      const updatedData = { ...newData };
      setData(updatedData);
      if (callback) callback(updatedData);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, updateData };
}

export function useFirestoreDeleteData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function deleteData(collectionName, id, callback = null) {
    try {
      setError(null);
      await deleteDoc(doc(db, collectionName, id));
      setData(id);
      if (callback) callback(id);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return { data, error, deleteData };
}
