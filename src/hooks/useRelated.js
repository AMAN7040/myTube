import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearRelated, fetchRelated } from "../utils/videoSlice";
import { YT_MULTIVIDEO, YT_RELATED } from "../utils/constants";

const useRelated = () => {
  const video = useSelector((store) => store.video.watchVideo);
  const dispatch = useDispatch();

  const searchResult = async (tags, channelId) => {
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
      throw error;
    }
  };

  const videoResult = async (videoIds) => {
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
      throw error;
    }
  };

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
  }, [dispatch, video?.snippet?.tags, video?.snippet?.channelId]);
};

export default useRelated;
