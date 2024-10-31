import React, { useEffect, useRef, useState } from "react";
import { Upload } from "../Upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import ReactMarkdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-async-light";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const NewPrompt = ({ data, addNewMessage }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history:
      data?.history?.map(({ role, parts }) => ({
        role: role || "user",
        parts: [{ text: parts[0]?.text || "" }],
      })) || [],
    generationConfig: {
      // maxOutputTokens: 10000,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Add the new message to Chat's history as the final answer
      addNewMessage({
        role: "assistant",
        parts: [{ text: answer }],
        img: img.dbData?.filePath,
      });

      setQuestion("");
      setAnswer("");
      setImg({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;

        // Update answer progressively to create typing effect
        setAnswer(accumulatedText);

        // Delay to enhance the typing effect (optional)
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Once streaming ends, update the answer with the full accumulated text
      setAnswer(accumulatedText);
      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
    formRef.current.reset();
  };

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, [data]);

  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && (
        <div className="p-[20px] bg-[#2c2937] rounded-[20px] max-w-[80%] self-end">
          {question}
        </div>
      )}
      {answer && (
        <div className="p-[20px]">
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
            {answer}
          </ReactMarkdown>
        </div>
      )}
      <div className="pb-[100px]" ref={endRef}></div>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="absolute flex items-center gap-[20px] w-[60%] bottom-0 bg-[#2c2937] rounded-[20px] p-[10px]"
      >
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          name="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border-none outline-none text-[#ececec]"
        />
        <button className="flex justify-center items-center p-[10px] border-none rounded-[50%] bg-[#605e68] cursor-pointer">
          <img src="/arrow.png" alt="arrow" className="w-[16px] h-[16px]" />
        </button>
      </form>
    </>
  );
};
