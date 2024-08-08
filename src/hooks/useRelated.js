import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { fetchRelated } from "../utils/videoSlice";
import { YT_MULTIVIDEO, YT_RELATED } from "../utils/constants";

const useRelated = () => {
  const video = useSelector((store) => store.video.watchVideo);
  const dispatch = useDispatch();

  // Memoized function to fetch related video IDs
  const searchResult = useCallback(async (tags, channelId) => {
    try {
      const tagQuery = tags.map((tag) => encodeURIComponent(tag)).join(" "); // Adjust delimiter to space
      const response = await fetch(YT_RELATED(tagQuery, channelId));
      const data = await response.json();

      if (data.error) {
        throw new Error("API error: " + data.error.message);
      }

      return data.items.map((item) => item.id.videoId);
    } catch (error) {
      console.error("Error fetching related video IDs:", error);
      throw error; // Allow the caller to handle the error
    }
  }, []);

  // Memoized function to fetch video details
  const videoResult = useCallback(async (videoIds) => {
    try {
      const videoIdsString = videoIds.join(",");
      const response = await fetch(YT_MULTIVIDEO + videoIdsString);
      const data = await response.json();

      if (data.error) {
        throw new Error("API error: " + data.error.message);
      }

      return data.items;
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw error; // Allow the caller to handle the error
    }
  }, []);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        if (!video?.snippet?.tags || !video?.snippet?.channelId) {
          return; // Exit early if required data is missing
        }

        const relatedVideoIds = await searchResult(
          video?.snippet?.tags,
          video?.snippet?.channelId
        );

        const relatedVideos = await videoResult(relatedVideoIds);

        // Dispatch action to update Redux store with fetched related videos
        dispatch(fetchRelated(relatedVideos));
      } catch (error) {
        console.error("Error fetching related videos:", error);
        // Handle error or dispatch an action for failure if needed
      }
    };

    fetchRelatedVideos();
  }, [dispatch, video?.snippet?.tags, video?.snippet?.channelId, searchResult, videoResult]);
};

export default useRelated;
