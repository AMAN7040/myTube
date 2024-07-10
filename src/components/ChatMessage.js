import React from 'react'
import { useSelector } from 'react-redux';

const ChatMessage = () => {
    const messages =  useSelector((store)=> store.live.chat);
    return (
        <div>
          {messages && messages.map((message) => (
            <div key={message.id} className="flex mx-5">
              <img
                className="rounded-full h-6 w-6 my-2 mx-2"
                src={message?.authorDetails?.profileImageUrl}
                alt='UserImg'
              />
              <h3 className="text-white my-2 mx-2">{message.authorDetails.displayName}</h3>
              <p className="text-white my-3 mx-2 text-sm">{message.snippet.displayMessage}</p>
            </div>
          ))}
        </div>
      );
}

export default ChatMessage