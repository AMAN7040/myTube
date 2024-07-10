import React from "react";
import ChatMessage from "./ChatMessage";

import useLiveChat from "../hooks/useLiveChat";

const Live = () => {

    useLiveChat();

  return (
    <div>
      <div className="border-b border-gray-400 py-2">
        <h3 className="text-white px-5">LIVE CHAT</h3>
      </div>
      <div className="overflow-y-auto h-[60vh]">
        <ChatMessage/>  
      </div>
      <div className="border-t border-gray-400">
        <input
          type="text"
          className="text-white mx-3 my-2 rounded-lg w-[70%] px-2 text-md py-1"
          style={{ backgroundColor: "#FFFFFF1A" }}
          placeholder="Enter Live Comment"
        />
        <button
          className="border border-white px-1 mx-2 my-2 rounded-lg text-sm  text-white w-[10%]"
          style={{ backgroundColor: "#FFFFFF1A" }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Live;
