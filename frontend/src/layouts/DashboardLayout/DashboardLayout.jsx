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

  if (!isLoaded)
    return (
      <div className="flex h-full justify-center items-center">Loading...</div>
    );

  return (
    <div className="flex gap-[50px] pt-[20px] h-full">
      <div className="flex-1">
        <ChatList />
      </div>
      <div className="flex-[4] bg-[#12101b] p-[20px] rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};
