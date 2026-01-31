import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
