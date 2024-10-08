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
    <li className="flex my-1 mx-1 lg:mx-2 lg:my-2 2xl:my-3 2xl:mx-3">
      <div className="mx-4 md:mx-4 lg:mx-4 my-1 2xl:mx-2 w-0.5/5">
        <img
          className="rounded-full h-7 w-7 bg-cover mx-1 md:mx-3 lg:h-8 lg:mx-2 lg:w-8 2xl:h-10 2xl:w-10 2xl:mx-2"
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          alt="profileImg"
        />
      </div>
      <div className="w-4/5 md:w-full lg:w-full 2xl:w-full">
        <p>
          <strong className="mx-0 md:mx-2 lg:mx-2 2xl:mx-2 text-xs 2xl:text-sm">
            {comment.snippet.topLevelComment.snippet.authorDisplayName}
            <span className="text-xs text-gray-400">
              {formattedDate}
            </span>
          </strong>
        </p>
        <p className="mx-0 md:mx-2 lg:mx-2 my-2 text-[11px] lg:text-[13px] 2xl:mx-5 2xl:text-[15px]">
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

  const filteredComments = allComments.filter(comment => video?.id === comment?.snippet?.videoId);

  return (
    <div className="text-white mx-0 md:mx-1 my-2 text-sm lg:mx-2 lg:my-4 lg:text-lg 2xl:mx-3 2xl:my-4 2xl:text-md">
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {filteredComments?.length > 0 ? (
        <ul>
          {filteredComments.map((comment, index) => (
             <CommentItem key={comment?.etag + index} comment={comment} />
          ))}
        </ul>
      ) : !loading && <p>No comments available.</p>}
      {pageToken && !loading && (
        <button className="text-xs mx-1 lg:mx-2 lg:text-sm 2xl:mx-2 2xl:text-sm" onClick={() => fetchComments(pageToken)}>
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default Comment;

