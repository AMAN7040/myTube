import React, { useState } from "react";
import { useSelector } from "react-redux";
import usePostComment from "../hooks/usePostComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const video = useSelector((store) => store.video.watchVideo);
  const user = useSelector((store) => store.user.userInfo);

  const postComment = usePostComment();

  const handlePostComment = async () => {
    if (commentText.length === 0) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await postComment(video?.id, commentText);
      setSuccessMessage("Comment posted successfully!");
      setCommentText("");
    } catch (error) {
      setErrorMessage("Failed to post comment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col my-2 2xl:my-4">
      <div className="flex">
        <div className="mr-2 my-3 2xl:mr-5 2xl:my-4">
          {user ? (
            <img
              className="h-6 w-6 rounded-full lg:h-7 lg:w-7 2xl:h-8 2xl:w-8"
              src={user.photoUrl}
              alt="userImg"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="text-white border border-gray-600 text-md p-1 rounded-full cursor-pointer 2xl:text-lg"
            />
          )}
        </div>
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border-b-2 text-sm bg-transparent focus:border-white focus:outline-none"
          type="text"
          required
        />
      </div>
      <div className="flex justify-end my-2 mx-1 2xl:my-3 2xl:mx-2">
        <button
          className="text-white text-sm mx-1"
          onClick={handlePostComment} // Invoke function directly
          disabled={loading} // Disable button when loading is true
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </div>
      {successMessage && (
        <div className="text-green-500 text-sm mt-2">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CommentForm;
