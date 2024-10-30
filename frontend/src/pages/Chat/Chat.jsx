import React from "react";
import { NewPrompt } from "../../components/NewPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const Chat = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="relative flex flex-col h-full items-center">
      <div className="flex flex-1 overflow-auto w-full justify-center">
        <div className="flex flex-col w-[60%]">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong"
            : data?.history?.map((message, index) => (
                <div key={index}>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={`p-[20px] rounded-[20px] max-w-[80%] ${
                      message.role === "user"
                        ? "bg-[#2c2937] self-end"
                        : "self-start"
                    }`}
                  >
                    <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
                  </div>
                </div>
              ))}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};
