import React, { useEffect, useRef } from "react";

export const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Add new chat */}
      <div className="pb-[100px]" ref={endRef}></div>
      <form
        action=""
        className="absolute flex items-center gap-[20px] w-[50%] bottom-0 bg-[#2c2937] rounded-[20px] p-[10px]"
      >
        <label
          htmlFor="file"
          className="flex justify-center items-center p-[10px] border-none rounded-[50%] bg-[#605e68] cursor-pointer"
        >
          <img
            src="/attachment.png"
            alt="attachment"
            className="w-[16px] h-[16px]"
          />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
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
