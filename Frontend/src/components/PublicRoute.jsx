import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If already logged in, redirect to home
  if (auth.user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
