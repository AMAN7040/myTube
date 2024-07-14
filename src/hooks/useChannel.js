import { useEffect } from "react";
import { YT_SUBSCRIPTION, YT_CHANNEL_PLAYLIST } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getChannelDetails, getChannelVideos } from "../utils/channelSlice";

const useChannel = (channelId) => {
  const dispatch = useDispatch();

  const getChannel = async () => {
    try {
      const response = await fetch(`${YT_SUBSCRIPTION}${channelId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filterdata = data.items[0];

      dispatch(getChannelDetails(filterdata));
      const uploadId = filterdata.contentDetails.relatedPlaylists.uploads;
      getVideos(uploadId);
    } catch (error) {
      console.error("Failed to fetch channel details:", error);
    }
  };

  const getVideos = async (playlistId) => {
    try {
      const response = await fetch(`${YT_CHANNEL_PLAYLIST}${playlistId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filterdata = data.items;

      dispatch(getChannelVideos(filterdata));
    } catch (error) {
      console.error("Failed to fetch channel videos:", error);
    }
  };

  useEffect(() => {
    if (channelId) {
      getChannel();
    }
  }, [channelId, dispatch]);
};

export default useChannel;
