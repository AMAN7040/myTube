import { useSelector } from "react-redux";
import { YT_COMMENT_POST } from "../utils/constants";

const usePostComment = () => {
  const { userInfo } = useSelector((store) => store.user);
  const { oauthAccessToken } = userInfo;

  const postComment = async (videoId, commentText) => {
    // Ensure commentText is defined and not empty
    const trimmedCommentText = commentText.trim();
    if (!trimmedCommentText) return;

    // Construct request body
    const requestBody = {
      snippet: {
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: trimmedCommentText,
          },
        },
      },
    };

    try {
      // Send POST request to YouTube API
      const response = await fetch(YT_COMMENT_POST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oauthAccessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to post comment: ${errorResponse.error.message}`);
      }

      const responseData = await response.json();
      return responseData; // Optionally handle or return response data
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error; // Propagate the error back to the caller for handling
    }
  };

  return postComment;
};

export default usePostComment;