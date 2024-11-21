import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

const useEmailAuth = () => {
  const [authError, setAuthError] = useState(null);

  const signUpWithEmail = async (email, password, callback) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (callback) callback(userCredential);
    } catch (error) {
      handleAuthError(error, "signup");
    }
  };

  const logInWithEmail = async (email, password, callback) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (callback) callback(userCredential);
    } catch (error) {
      handleAuthError(error, "login");
    }
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const handleAuthError = (error, type) => {
    if (type === "signup" && error.code === "auth/email-already-in-use") {
      setAuthError("이미 사용중인 이메일입니다.");
    } else if (type === "signup" && error.code === "auth/invalid-email") {
      setAuthError("잘못된 이메일 형식입니다.");
    } else if (type === "signup" && error.code === "auth/weak-password") {
      setAuthError("비밀번호가 너무 약합니다.");
    } else if (type === "login" && error.code === "auth/user-not-found") {
      setAuthError("이메일 주소를 찾을 수 없습니다.");
    } else if (type === "login" && error.code === "auth/wrong-password") {
      setAuthError("잘못된 비밀번호입니다.");
    } else {
      setAuthError("인증 중 오류가 발생했습니다.");
    }
  };

  return { signUpWithEmail, logInWithEmail, logOut, authError };
};

export default useEmailAuth;
