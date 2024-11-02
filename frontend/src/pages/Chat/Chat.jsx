import React, { useState, useEffect } from "react";
import { NewPrompt } from "../../components/NewPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
                <div
                  key={index}
                  className={`px-[20px] rounded-[20px] max-w-[80%] ${
                    message.role === "user"
                      ? "bg-[#2c2937] self-end"
                      : "self-start"
                  }`}
                >
                  {
                    message.img && message.img.trim() !== "" ? (
                      <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lqip={{ active: true, quality: 20 }}
                      />
                    ) : null /* Do not render IKImage if path is invalid */
                  }
                  <div>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="my-5 text-justify">{children}</p>
                        ),
                        li: ({ children }) => (
                          <li className="ml-6 list-disc mb-4">{children}</li>
                        ),
                        ol: ({ children }) => (
                          <ol className="ml-6 list-decimal mb-4">{children}</ol>
                        ),
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={materialDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className="bg-[#424242] text-white p-1 rounded">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.parts[0].text}
                    </ReactMarkdown>
                    {/* <ReactMarkdown>{message.parts[0].text}</ReactMarkdown> */}
                  </div>
                </div>
              ))}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};
