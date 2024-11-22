import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const useGoogleAuth = () => {
  const [authError, setAuthError] = useState(null);

  const signUpWithGoogle = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Google 로그인 성공 시 사용자 정보 반환
      return user;
    } catch (error) {
      setAuthError("Google 회원가입 중 오류가 발생했습니다.");
      console.error(error);
      throw error; // 에러를 상위로 전달
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
