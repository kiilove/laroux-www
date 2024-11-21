import { useState, useEffect } from "react";
import { rtdb } from "../../services/firebase";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue,
  off,
} from "firebase/database";

export function useRealtimeQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function subscribeToData(path, callback, options = {}) {
    setLoading(true);
    const { orderBy, limit } = options;
    let dataRef = ref(rtdb, path);

    if (orderBy || limit) {
      const constraints = [];
      if (orderBy) constraints.push(orderByChild(orderBy));
      if (limit) constraints.push(limitToLast(limit));
      dataRef = query(dataRef, ...constraints);
    }

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        callback(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => {
      off(dataRef);
      unsubscribe();
    };
  }

  return {
    loading,
    error,
    subscribeToData,
  };
}
