import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import usePostComment from "../hooks/usePostComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { getAllComments } from "../utils/commentSlice";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  // const [loading, setLoading] = useState(false); // State to manage loading state
  // const video = useSelector((store) => store.video.watchVideo);
  const user = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch()
  // const post = usePostComment();

  const handlePostComment = async () => {
    if (commentText.length === 0) return;

    // setLoading(true);

    try {
      // await post(video?.id, commentText);
      dispatch(getAllComments(commentText))
      setCommentText("");
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex flex-col my-4">
      <div className="flex">
        <div className="mr-5 my-4">
          {user ? (
            <img
              className="h-8 w-8 rounded-full"
              src={user.photoUrl}
              alt="userImg"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="text-white border border-gray-600 text-lg p-1 rounded-full cursor-pointer"
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
      <div className="flex justify-end my-3 mx-2">
        <button
          className="text-white text-sm mx-1"
          onClick={() => handlePostComment}
          // disabled={loading} // Disable button when loading is true
        >
          {/* {loading ? "Posting..." : "Comment"} */}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
