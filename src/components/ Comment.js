import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import useComment from "../hooks/useComment";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";

// Create a separate component for each comment item and memoize it
const CommentItem = React.memo(({ comment }) => {
  const formatPublishedAt = useFormatPublishedDate();
  const formattedDate = useMemo(() => 
    formatPublishedAt(comment?.snippet?.topLevelComment?.snippet?.updatedAt) || 
    formatPublishedAt(comment?.snippet?.topLevelComment?.snippet?.publishedAt),
    [comment, formatPublishedAt]
  );

  return (
    <li className="flex my-3 mx-3">
      <div className="mx-2 my-1">
        <img
          className="rounded-full h-10 w-10 bg-cover mx-2"
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          alt="profileImg"
        />
      </div>
      <div>
        <p>
          <strong className="text-sm">
            {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
            <span className="text-xs text-gray-400">
              {formattedDate}
            </span>
          </strong>
        </p>
        <p className="mx-5 my-1 text-sm">
          {comment.snippet.topLevelComment.snippet.textDisplay}
        </p>
      </div>
    </li>
  );
});

const Comment = () => {
  const video = useSelector((store) => store.video.watchVideo);
  const { pageToken, allComments } = useSelector((store) => store.comment);
  const { loading, error, fetchComments } = useComment(video?.id, pageToken);

  return (
    <div className="text-white mx-3 my-4 text-md">
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {allComments && allComments.map((comment, index) => (
          <CommentItem key={comment?.snippet?.topLevelComment?.etag + index} comment={comment} />
        ))}
      </ul>
      {pageToken && !loading && (
        <button className="text-sm mx-2" onClick={() => fetchComments(pageToken)}>
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default Comment;
