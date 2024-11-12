import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa"; // Import trash icon

export const ChatList = ({ focusedChatId }) => {
  // Accept focusedChatId as prop
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [focusedChat, setFocusedChat] = useState(focusedChatId); // Initialize with prop

  // Watch for focusedChatId prop change
  useEffect(() => {
    setFocusedChat(focusedChatId);
  }, [focusedChatId]);

  const [hoveredChat, setHoveredChat] = useState(null); // State to track hovered chat

  // Fetch chats
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
    onError: (err) => {
      console.error(err);
      navigate("/dashboard"); // Redirect if fetching fails
    },
  });

  // Mutation to delete a chat
  const deleteChat = useMutation({
    mutationFn: (chatId) =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
      navigate("/dashboard");
    },
  });

  // Delete button click handler
  const handleDelete = (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteChat.mutate(chatId);
    }
  };

  // Click handler to set focus on chat item
  const handleFocus = (chatId) => {
    setFocusedChat(chatId);
  };

  return (
    <div className="flex flex-col h-full">
      <span className="font-semibold text-[10px] mb-[10px]">DASHBOARD</span>
      {/* Button removed as handleCreateChat is handled in NewPrompt.jsx */}
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
      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] rounded-[5px] my-[20px]" />
      <span className="font-semibold text-[10px] mb-[10px]">RECENT CHATS</span>
      <div className="flex flex-col overflow-y-auto">
        {!data?.length && !isPending && !error && (
          <div className="p-[10px]">No chat record</div>
        )}
        {isPending && <div className="p-[10px]">Loading...</div>}
        {error && <div className="p-[10px]">Something went wrong</div>}

        {/* Render existing chats in reverse order to display newest chats at the top */}
        {data?.length > 0 &&
          [...data].reverse().map(
            (
              chat // Reverse the array to show latest at the top
            ) => (
              <div
                key={chat._id}
                onClick={() => handleFocus(chat._id)}
                onMouseEnter={() => setHoveredChat(chat._id)}
                onMouseLeave={() => setHoveredChat(null)}
                className={`flex items-center justify-between w-full p-[10px] rounded-[10px] 
                          ${
                            focusedChat === chat._id || hoveredChat === chat._id
                              ? "bg-[#2c2937]"
                              : "hover:bg-[#2c2937]"
                          }`}
              >
                <Link
                  to={`/dashboard/chats/${chat._id}`}
                  className="flex-1 text-white"
                >
                  {chat.title}
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent Link click
                    handleDelete(chat._id);
                  }}
                  className={`ml-2 text-white transition-opacity duration-200 
                            ${
                              focusedChat === chat._id ||
                              hoveredChat === chat._id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                >
                  <FaTrash /> {/* Trash icon */}
                </button>
              </div>
            )
          )}
      </div>

      <hr className="border-none h-[2px] bg-[#ddd] opacity-[0.1] my-[20px]" />
      <div className="mt-auto flex items-center gap-[10px] text-[12px]">
        <span className="font-semibold">Medishure AI •</span>
        <span className="text-[#888]">Version 0.1.0</span>
      </div>
    </div>
  );
};
