import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
const HomeLayout = () => {
  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default HomeLayout;
