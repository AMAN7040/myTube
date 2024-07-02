import { useEffect, useState } from "react";
import { YT_COMMENT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getAllComments, updateToken } from "../utils/commentSlice";

const useComment = (videoId, pageToken) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(YT_COMMENT(videoId, pageToken));

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      const filterData = data.items;
      const token = data.nextPageToken;
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
      fetchComments();
    }
  }, [videoId]);

  return { loading, error, fetchComments };
};

export default useComment;
