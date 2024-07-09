import { useDispatch } from "react-redux";
import {
  YT_MULTIVIDEO,
  YT_PLAYLIST_D,
  YT_SEARCH_VD,
  YT_SUBSCRIPTION,
} from "../utils/constants";
import { useEffect } from "react";
import { getSearchResults } from "../utils/searchSlice";

const useSearchResults = (query) => {
  const dispatch = useDispatch();

  const fetchResults = async () => {
    try {
      const response = await fetch(YT_SEARCH_VD + query);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();

      const filterdata = data.items || [];
      const videoIds = filterdata
        .filter((item) => item.id.kind === "youtube#video")
        .map((item) => item.id.videoId)
        .join(",");
      const channelIds = filterdata
        .filter((item) => item.id.kind === "youtube#channel")
        .map((item) => item.id.channelId)
        .join(",");
      const playlistIds = filterdata
        .filter((item) => item.id.kind === "youtube#playlist")
        .map((item) => item.id.playlistId)
        .join(",");

      const fetchVideoDetails = videoIds
        ? fetch(YT_MULTIVIDEO + videoIds).then((res) => res.json())
        : { items: [] };
      const fetchChannelDetails = channelIds
        ? fetch(YT_SUBSCRIPTION + channelIds).then((res) => res.json())
        : { items: [] };
      const fetchPlaylistDetails = playlistIds
        ? fetch(YT_PLAYLIST_D + playlistIds).then((res) => res.json())
        : { items: [] };

      const [videoDetailsData, channelDetailsData, playlistDetailsData] =
        await Promise.all([
          fetchVideoDetails,
          fetchChannelDetails,
          fetchPlaylistDetails,
        ]);

      const combinedResults = [
        ...videoDetailsData.items,
        ...channelDetailsData.items,
        ...playlistDetailsData.items,
      ];
      dispatch(getSearchResults(combinedResults));
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error (e.g., show error message to user, retry logic)
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  return null; // Or any other hook-specific return value
};

export default useSearchResults;
