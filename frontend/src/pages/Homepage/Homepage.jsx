import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="flex flex-col lg:flex-row items-center lg:gap-[100px] h-full">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col items-center justify-center gap-[16px] text-center">
        <h1 className="text-[64px] lg:text-[128px] bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent font-semibold">
          MediAI
        </h1>
        <h2 className="font-bold text-[18px]">
          Supercharge your creativity and productivity
        </h2>
        <h3 className="max-w-[100%] lg:max-w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          consequuntur aspernatur tenetur? Libero aut obcaecati cumque excepturi
          numquam.
        </h3>
        <Link to="/dashboard">
          <button className="py-[15px] px-[25px] bg-[#217bfe] text-white rounded-[18px] text-[14px] hover:bg-white hover:text-[#217bfe]">
            Get Started
          </button>
        </Link>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="relative flex items-center justify-center bg-[#140e2d] rounded-[50px] w-[80%] h-[50%]">
          <div className="absolute w-full h-full overflow-hidden top-0 left-0 rounded-[50px]">
            <div className="w-[200%] h-[100%] bg-[url('/bg.png')] bg-[length:auto_100%] opacity-20 animate-slideBg -z-10"></div>
          </div>
          <img
            src="/bot.png"
            alt="Bot"
            className="absolute w-full h-full object-contain p-[20px]"
          />
          <div className="hidden lg:flex absolute bottom-[-30px] right-[-50px] items-center gap-[10px] p-[20px] bg-[#2c2937] rounded-[10px] object-cover">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }
              alt="bot"
              className="w-[32px] h-[32px] rounded-[50%]"
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Kim: What is IPMI?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Meddy: IPMI is International Private Medical Insurance",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Pau: What is Deductible?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Meddy: The amount the insured must pay before insurance covers expenses",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] flex flex-col items-center gap-[10px]">
        <img src="/medi-ai-logo-white.png" alt="logo" className="w-[50px]" />
        <div className="flex gap-[10px] text-[#888] text-[10px]">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};
