import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.jsx";

export const PrivateRoute = () => {
  const {user} = useAuth();
  
  
  return user.role=="student" ? <Outlet /> : <Navigate to="/login" />;
};
