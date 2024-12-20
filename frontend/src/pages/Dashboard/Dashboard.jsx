import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Dashboard = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-[60%] gap-[50px]">
        <h1 className="text-[64px] bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent font-bold">
          MediAI
        </h1>

        <div className="w-full flex items-center justify-between gap-[50px]">
          <div className="flex flex-1 flex-col gap-[10px] font-light text-[14px] p-[20px] border-solid border-[1px] border-[#555] rounded-[20px]">
            <img
              src="/chat.png"
              alt="chat"
              className="w-[40px] h-[40px] object-cover"
            />
            <span>Create a new chat</span>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] font-light text-[14px] p-[20px] border-solid border-[1px] border-[#555] rounded-[20px]">
            <img
              src="/image.png"
              alt="image"
              className="w-[40px] h-[40px] object-cover"
            />
            <span>Analyze images</span>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] font-light text-[14px] p-[20px] border-solid border-[1px] border-[#555] rounded-[20px]">
            <img
              src="/code.png"
              alt="code"
              className="w-[40px] h-[40px] object-cover"
            />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="flex mt-auto w-[60%] bg-[#2c2937] rounded-[20px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-full h-full items-center justify-between gap-[20px] mb-[10px]"
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="flex-1 p-[10px] bg-transparent border-none outline-none text-[#ececec] ml-[10px]"
          />
          <button className="bg-[#605e68] rounded-[60%] border-none cursor-pointer p-[10px] mr-[10px]">
            <img src="/arrow.png" alt="arrow" className="w-[16px] h-[16px]" />
          </button>
        </form>
      </div>
    </div>
  );
};
