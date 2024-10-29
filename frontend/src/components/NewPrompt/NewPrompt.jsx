import React, { useEffect, useRef, useState } from "react";
import { Upload } from "../Upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: [],
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    // const prompt = "What is the version of genshin today?";
    setQuestion(text);

    const result = await model.generateContent(text);
    setAnswer(result.response.text());
  };

  console.log(answer);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };

  return (
    <>
      {/* Add new chat */}
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
              // Custom rendering for paragraphs
              p: ({ children }) => (
                <p className="my-5 text-justify">{children}</p>
              ),
              // Custom rendering for list items
              li: ({ children }) => (
                <li className="ml-6 list-disc mb-4">{children}</li>
              ),
              ol: ({ children }) => (
                <ol className="ml-6 list-decimal mb-4">{children}</ol>
              ),
              // Custom rendering for code blocks
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
        className="absolute flex items-center gap-[20px] w-[50%] bottom-0 bg-[#2c2937] rounded-[20px] p-[10px]"
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
