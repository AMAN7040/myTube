import { useDispatch } from "react-redux";
import { YT_LIVE_CHAT } from "../utils/constants";
import { getChat } from "../utils/liveSlice";
import { useEffect } from "react";

const useLiveChat = (liveID) => {
  const dispatch = useDispatch();

  const fetchLiveChat = async () => {
    const liveChatId = liveID?.liveStreamingDetails?.activeLiveChatId;
    if (!liveChatId) {
      return;
    }

    try {
      const response = await fetch(`${YT_LIVE_CHAT}${liveChatId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const chatMessages = data.items || [];
      dispatch(getChat(chatMessages));
    } catch (error) {
      console.error("Error fetching live chat:", error);
    }
  };

  useEffect(() => {

    if (!liveID || !liveID.liveStreamingDetails.activeLiveChatId) return;

    const timer = setInterval(() => {
      fetchLiveChat();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [liveID?.liveStreamingDetails?.activeLiveChatId]);

  // Optionally, return any needed data or functionality from the hook
};

export default useLiveChat;
