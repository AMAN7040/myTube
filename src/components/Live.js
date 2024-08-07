import React, { useState } from "react";
import ChatMessage from "./ChatMessage";

import useLiveChat from "../hooks/useLiveChat";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../utils/liveSlice";

const Live = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const liveID = useSelector((store) => store.video.watchVideo);
  const user = useSelector((store) => store.user.userInfo);
  useLiveChat(liveID);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      id: Math.random().toString(36).substring(2, 11),
      authorDetails: {
        profileImageUrl: user.photoUrl, // Example URL
        displayName: user.displayName, // Example display name
      },
      snippet: {
        displayMessage: liveMessage,
      },
    };

    // Dispatch the action to send the message
    dispatch(addChatMessage(newMessage));

    // Clear the input after sending the message
    setLiveMessage("");
  };

  return (
    <div>
      <div className="border-b border-gray-400 py-2">
        <h3 className="text-white px-2 lg:px-5 2xl:px-5">LIVE CHAT</h3>
      </div>
      <div className="flex-col-reverse overflow-y-auto h-[40vh] lg:h-[70vh] 2xl:h-[60vh]">
        <ChatMessage />
      </div>
      {user && (
        <div className="border-t border-gray-400">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="text-white mx-3 my-2 rounded-lg w-[70%] px-2 text-sm lg:text-md 2xl:text-md py-1"
              style={{ backgroundColor: "#FFFFFF1A" }}
              placeholder="Enter Live Comment"
              value={liveMessage}
              onChange={(e) => setLiveMessage(e.target.value)}
            />
            <button
              className="border border-white px-1 mx-2 my-2 rounded-lg text-[10px] lg:text-sm 2xl:text-sm 2xl:mx-2 2xl:my-2 text-white w-[15%] 2xl:w-[10%]"
              style={{ backgroundColor: "#FFFFFF1A" }}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Live;
