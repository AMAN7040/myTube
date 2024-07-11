import React from 'react'
import { useSelector } from 'react-redux';

const ChatMessage = () => {
    const messages =  useSelector((store)=> store.live.chat); 

    if (!messages || messages.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400">No messages yet.</p>
        </div>
      );
    }


    return (
        <div>
          {messages && messages.map((message, index) => (
            <div key={message.id + index} className="flex mx-5 my-1 shadow-lg">
              <img
                className="rounded-full h-6 w-6 my-2 mx-2"
                src={message?.authorDetails?.profileImageUrl}
                alt='UserImg w-[10%]'
              />
              <h3 className="text-white my-2 mx-2 w-[40%]">{message?.authorDetails?.displayName}</h3>
              <p className="text-white my-3 mx-2 text-xs w-[50%]">{message?.snippet?.displayMessage}</p>
            </div>
          ))}
        </div>
      );
}

export default ChatMessage