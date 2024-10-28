import React, { useEffect, useRef, useState } from "react";
import { Upload } from "../Upload/Upload";
import { IKImage } from "imagekitio-react";

export const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: [],
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

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
      <div className="pb-[100px]" ref={endRef}></div>
      <form
        action=""
        className="absolute flex items-center gap-[20px] w-[50%] bottom-0 bg-[#2c2937] rounded-[20px] p-[10px]"
      >
        <Upload setImg={setImg} />
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
