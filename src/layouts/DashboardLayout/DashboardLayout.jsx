import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import css from "./DashboardLayout.module.css";
import { useAuth } from "@clerk/clerk-react";

export const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/login");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className={css.dashboard}>
      <div className={css.menu}>MENU</div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
