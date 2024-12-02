import { useState } from "react"; // React의 상태 관리 훅
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  onSnapshot,
} from "firebase/firestore"; // Firestore 관련 메서드
import { db } from "../../services/firebase"; // Firebase 초기화 파일

export function useFirestoreQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null); // 마지막 문서 저장 상태

  // 전체 문서 수 가져오기
  async function getDocumentCount(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.size;
    } catch (error) {
      console.error("Error fetching document count:", error);
      setError(error);
      return 0;
    }
  }

  // 데이터 가져오기 함수 (with realtime support and cursor-based pagination)
  async function getDocuments(
    collectionName,
    callback = null,
    {
      conditions = [],
      limitNumber = 0,
      orderByField = "",
      orderByDirection = "asc",
      realtime = false,
      lastVisible = null, // 추가된 커서 매개변수
    } = {}
  ) {
    setLoading(true);
    setError(null);

    try {
      let baseQuery = collection(db, collectionName);
      let queryConstraints = [];

      console.log(conditions);
      // 조건 추가
      conditions.forEach((condition) => {
        queryConstraints.push(condition);
      });

      // 정렬 추가
      if (orderByField) {
        queryConstraints.push(orderBy(orderByField, orderByDirection));
      }

      // 커서 추가
      if (lastVisible) {
        queryConstraints.push(startAfter(lastVisible)); // 이전 페이지의 마지막 문서 다음부터 시작
      }

      // 페이지 크기 제한 추가
      if (limitNumber > 0) {
        queryConstraints.push(limit(limitNumber));
      }

      // 최종 쿼리 생성
      const finalQuery = query(baseQuery, ...queryConstraints);

      if (realtime) {
        // 실시간 데이터 처리
        const unsubscribe = onSnapshot(finalQuery, (querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (callback) {
            callback(documents);
          }

          // 마지막 문서 저장
          const lastVisibleDoc =
            querySnapshot.docs[querySnapshot.docs.length - 1];
          setLastVisibleDoc(lastVisibleDoc);
        });

        // 구독 해제를 반환하여 나중에 cleanup 가능
        return unsubscribe;
      } else {
        // 정적 데이터 가져오기
        const querySnapshot = await getDocs(finalQuery);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 마지막 문서 저장
        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisibleDoc(lastVisibleDoc);

        if (callback) {
          callback(documents);
        }

        return documents;
      }
    } catch (error) {
      console.error("Error in getDocuments:", error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getDocuments,
    getDocumentCount,
    lastVisibleDoc, // 마지막 문서 상태 반환
    resetCursor: () => setLastVisibleDoc(null), // 커서 초기화 함수
  };
}
