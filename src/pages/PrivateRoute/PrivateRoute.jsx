import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate=useNavigate()
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    if (!currentUser ||currentUser===null) {
      window.location.reload();
      navigate("/auth/signin")
    }
  }, [currentUser]);

  return currentUser|| currentUser!==null ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
