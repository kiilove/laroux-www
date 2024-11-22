import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const useLogout = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return { logOut };
};

export default useLogout;
