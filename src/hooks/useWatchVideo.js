import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { YT_WATCH } from "../utils/constants";
import { getWatchVideo } from "../utils/videoSlice";
import { removeBar } from "../utils/sidebarSlice";

const useWatchVideo = (param) => {
  const dispatch = useDispatch();

  const fetchVideo = useCallback(async () => {
    if (!param) return;

    try {
      const response = await fetch(`${YT_WATCH}${param}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filterData = data.items[0];
      dispatch(getWatchVideo(filterData));
    } catch (error) {
      console.error("Failed to fetch video:", error);
    }
  }, [param, dispatch]);

  useEffect(() => {
    dispatch(removeBar());
    fetchVideo();
  }, [fetchVideo, dispatch]);

};

export default useWatchVideo;
