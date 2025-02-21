import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  return <div>Navbar</div>;
};
export default Navbar;
