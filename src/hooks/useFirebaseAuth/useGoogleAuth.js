import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";

const useGoogleAuth = () => {
  const [authError, setAuthError] = useState(null);

  const signUpWithGoogle = async (callback) => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore에 사용자 저장
      const userDoc = doc(db, "members", user.uid);
      await setDoc(userDoc, {
        email: user.email,
        displayName: user.displayName,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });

      if (callback) callback(user);
    } catch (error) {
      setAuthError("Google 회원가입 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const signInWithGoogle = async (callback) => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (callback) callback(user);
    } catch (error) {
      setAuthError("Google 로그인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return { signUpWithGoogle, signInWithGoogle, logOut, authError };
};

export default useGoogleAuth;
