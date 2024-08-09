import { useEffect, useState } from "react";
import { YT_COMMENT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getAllComments, resetComments, updateToken } from "../utils/commentSlice";

const useComment = (videoId, pageToken) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (nextPageToken) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(YT_COMMENT(videoId, nextPageToken));

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      const filterData = data.items || [];
      const token = data.nextPageToken || null;
      dispatch(getAllComments(filterData));
      dispatch(updateToken(token));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      // Reset comments when videoId changes
      dispatch(resetComments());
      fetchComments(); // Fetch comments for the new video
    }
  }, [videoId, dispatch]);

  return { loading, error, fetchComments };
};

export default useComment;
