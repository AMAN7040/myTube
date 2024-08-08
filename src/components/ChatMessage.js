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
            <div key={message.id + index} className="flex mx-1 lg:mx-4 2xl:mx-5 my-1 shadow-lg">
              <img
                className="rounded-full h-4 w-4 my-1 mx-1 lg:h-5 lg:w-5 lg:mx-2 lg:my-2 2xl:h-6 2xl:w-6 2xl:mx-2 2xl:my-2"
                src={message?.authorDetails?.profileImageUrl}
                alt='UserImg w-[10%]'
              />
              <h3 className="text-white text-xs my-1 mx-1 md:text-[13px] md:mx-1 lg:text-[11px] w-[40%] md:w-[1/4] lg:w[20%] 2xl: 2xl:w-[20%] 2xl:text-[13px]">{message?.authorDetails?.displayName}</h3>
              <p className="text-white my-1 mx-1 text-[9px] md:text-[10px] lg:text-[10px] lg:mx-3 w-[50%] md:w-[3/4] lg:w-[80%] 2xl:w-[80%] 2xl:text-[12px]">{message?.snippet?.displayMessage}</p>
            </div>
          ))}
        </div>
      );
}

export default ChatMessage