import { useState } from "react";
import { FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const useFacebookAuth = () => {
  const [authError, setAuthError] = useState(null);

  const signInWithFacebook = async (callback) => {
    setAuthError(null);
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (callback) callback(user);
    } catch (error) {
      setAuthError("Facebook 로그인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return { signInWithFacebook, logOut, authError };
};

export default useFacebookAuth;
