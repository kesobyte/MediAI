import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ChatList } from "../../components/ChatList/ChatList";

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
    <div className="flex gap-[50px] pt-[20px] h-full">
      <div className="flex-1">
        <ChatList />
      </div>
      <div className="flex-[4] bg-[#12101b]">
        <Outlet />
      </div>
    </div>
  );
};
