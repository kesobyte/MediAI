import React from "react";
import { Link } from "react-router-dom";

export const ChatList = () => {
  return (
    <div className="flex flex-col h-full">
      <span className="font-semibold text-[10px] mb-[10px]">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/dashboard">Explore MediAI</Link>
      <Link to="/dashboard">About</Link>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] rounden-[5px] my-[20px]" />

      <span className="font-semibold text-[10px] mb-[10px]">RECENT CHATS</span>
      <div className="flex flex-col overflow-y-auto">
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
        <Link className="p-[10px] rounded-[10px] hover:bg-[#2c2937]" to="/">
          My chat title
        </Link>
      </div>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] rounden-[5px] my-[20px]" />
      <div className="mt-auto flex items-center gap-[10px] text-[12px]">
        <img src="/medi-ai-logo-white.png" alt="logo" className="w-[80px]" />
        <div className="flex flex-col">
          <span className="font-semibold">Upgrade to MediAI Pro</span>
          <span className="text-[#888]">
            Get unlimited access to all features
          </span>
        </div>
      </div>
    </div>
  );
};