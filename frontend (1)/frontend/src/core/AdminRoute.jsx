import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.jsx";

const AdminRoute = () => {

    const {user } = useAuth();
    return user?.role == "admin" ? <Outlet /> : <Navigate to="/login" />;
};  
export default AdminRoute;