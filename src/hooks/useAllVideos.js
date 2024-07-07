// hooks/useAllVideos.js
import { useEffect, useState } from "react";
import { YT_VIDEO_API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../utils/videoSlice";

const useAllVideos = (nextPageToken) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useSelector((store) => store.video.videoCategoryId);

  const getVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `${YT_VIDEO_API}${id}`;

      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }

      const data = await response.json();
      const videos = data.items;
      const nextToken = data.nextPageToken;
      dispatch(getAllVideos({ videos, nextPageToken: nextToken }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, [id, nextPageToken]);

  return { loading, setLoading, error, getVideo };
};

export default useAllVideos;
