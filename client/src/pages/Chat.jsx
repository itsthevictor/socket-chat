import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
const Chat = () => {
  const { isCheckingAuth, checkAuth, user } = useAuth();
  console.log("oi", isCheckingAuth);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Navbar />
      Chat Chat Chat Chat Chat Chat Chat
    </>
  );
};
export default Chat;
