import { useEffect, useState } from "react";
import { YT_VIDEO_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getAllVideos } from "../utils/videoSlice";

const useAllVideos = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(YT_VIDEO_API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Invoke json() as a function
      const videos = data.items;
      dispatch(getAllVideos(videos));
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, [dispatch]);

  return { loading, error };
};

export default useAllVideos;
