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
        {!data?.length && !isPending && !error && (
          <div className="p-[10px]">No chat record</div>
        )}
        {isPending && <div className="p-[10px]">Loading...</div>}
        {error && <div className="p-[10px]">Something went wrong</div>}
        {data?.length > 0 &&
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

      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] my-[20px]" />
      <div className="mt-auto flex items-center gap-[10px] text-[12px]">
        <span className="font-semibold">Medishure AI •</span>
        <span className="text-[#888]">Version 0.1.0</span>
      </div>
    </div>
  );
};
