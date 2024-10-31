import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="flex flex-col h-full">
      <span className="font-semibold text-[10px] mb-[10px]">DASHBOARD</span>
      <Link
        className="p-[10px] rounded-[10px] hover:bg-[#2c2937]"
        to="/dashboard"
      >
        Create a new chat
      </Link>
      <Link
        className="p-[10px] rounded-[10px] hover:bg-[#2c2937]"
        to="/dashboard"
      >
        Explore MediAI
      </Link>
      <Link
        className="p-[10px] rounded-[10px] hover:bg-[#2c2937]"
        to="/dashboard"
      >
        About
      </Link>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] rounden-[5px] my-[20px]" />
      <span className="font-semibold text-[10px] mb-[10px]">RECENT CHATS</span>
      <div className="flex flex-col overflow-y-auto">
        {/* Early check if there are no chat records */}
        {!data?.length && !isPending && !error && <div>No chat record</div>}

        {/* Show loading only if data exists and is still being fetched */}
        {data?.length > 0 && isPending && <div>Loading...</div>}

        {/* Show error message if data exists but there's an error */}
        {data?.length > 0 && error && <div>Something went wrong</div>}

        {/* Render the data once it's available */}
        {data?.length > 0 &&
          !isPending &&
          !error &&
          data.map((chat) => (
            <Link
              to={`/dashboard/chats/${chat._id}`}
              key={chat._id}
              className="p-[10px] rounded-[10px] hover:bg-[#2c2937]"
            >
              {chat.title}
            </Link>
          ))}
      </div>

      {/* <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] rounden-[5px] my-[20px]" />
      <div className="mt-auto flex items-center gap-[10px] text-[12px]">
        <img src="/medi-ai-logo-white.png" alt="logo" className="w-[80px]" />
        <div className="flex flex-col">
          <span className="font-semibold">Upgrade to MediAI Pro</span>
          <span className="text-[#888]">
            Get unlimited access to all features
          </span>
        </div>
      </div> */}
    </div>
  );
};
