import BackdropLoader from "components/BackdropLoader";
import useAuth from "contexts/AuthContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate=useNavigate()
  useEffect(() => {
    if (location.pathname.endsWith("/logout")) {
      logout(); // Call the logout function
      navigate("/login")
    }
  }, [location, logout]);

  return <BackdropLoader />;
}
