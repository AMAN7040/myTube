import React from "react";
import useComment from "../hooks/useComment";
import { useSelector } from "react-redux";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";

const Comment = () => {
  const video = useSelector((store) => store.video.WatchVideo);
  const { pageToken, allComments } = useSelector((store) => store.comment);
  const { loading, error, fetchComments } = useComment(video?.id, pageToken);
  const formatPublishedAt = useFormatPublishedDate();

  return (
    <div className="text-white mx-3 my-4 text-md">
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      <ul className="">
        {allComments &&
          allComments.map((comment, index) => (
            <li
              key={comment?.snippet?.topLevelComment?.etag + index}
              className="flex my-3 mx-3"
            >
              <div className="mx-2 my-1">
                <img className="rounded-full h-10 w-10 bg-cover mx-2" src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profileImg"/>
              </div>
              <div>
                <p className="">
                  <strong className="text-sm">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span className="text-xs text-gray-400">
                      {formatPublishedAt(
                        comment?.snippet?.topLevelComment?.snippet?.updatedAt
                      ) ||
                        formatPublishedAt(
                          comment?.snippet?.topLevelComment?.snippet
                            ?.publishedAt
                        )}
                    </span>
                  </strong>
                </p>
                <p className="mx-5 my-1 text-sm">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>
              </div>
            </li>
          ))}
      </ul>
      {pageToken && !loading && (
        <button onClick={() => fetchComments(pageToken)}>
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default Comment;
