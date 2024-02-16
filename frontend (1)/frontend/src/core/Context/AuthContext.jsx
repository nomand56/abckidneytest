import {
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils/config.js";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('user'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (formData, loadingState) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/login`,
        formData
      );

      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      const { role } = response.data.data
      console.log("response.data.data", JSON.parse(sessionStorage.getItem("user")))
      toast.success("Logged in successfully.");
      role === "admin" ? navigate("/admin/dashboard") : navigate("/student/dashboard");
      window.location.reload();
    } catch (error) {
      console.error(error);
      loadingState();
      toast.error(error.response.data.message || "An error occurred while logging in.");
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/v1/signup`, formData);
      setTimeout(() => {
        toast.success("Account created successfully.");
        navigate("/login");
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "An error occurred while creating the account.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoading(true);


    sessionStorage.removeItem("user");

    setIsAuthenticated(false)
    setTimeout(() => {
      setLoading(false);
    }
      , 2000);



    toast.success("Logged out successfully.");
    navigate("/");

  };

  return (
    <AuthContext.Provider
      value={{ login, signup, loading, user, handleLogout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
