import { useDispatch, useSelector } from "react-redux";
import { YT_LIVE_CHAT } from "../utils/constants";
import { getChat } from "../utils/liveSlice";
import { useEffect } from "react";

const useLiveChat = () => {
  const video = useSelector((store) => store.video.watchVideo);
  const dispatch = useDispatch();

  const fetchLiveChat = async () => {
    const liveChatId = video?.liveStreamingDetails?.activeLiveChatId;
    console.log("Live Chat ID:", liveChatId); // Log liveChatId for debugging

    if (liveChatId) {
      try {
        const response = await fetch(YT_LIVE_CHAT + liveChatId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const chatMessages = data.items || []; // Ensure default empty array if no items
        dispatch(getChat(chatMessages));
      } catch (error) {
        console.error("Error fetching live chat:", error);
      }
    } else {
      console.error("Live chat ID not found");
    }
  };

  useEffect(() => {
   
      fetchLiveChat();

  }, [video?.liveStreamingDetails?.activeLiveChatId]); // Dependency array ensures useEffect runs when 'video' changes

};

export default useLiveChat;
