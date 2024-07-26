import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import useWatchVideo from "../hooks/useWatchVideo";
import useFormatViews from "../hooks/useFormatViews";
import useSubscribe from "../hooks/useSubscribe";
import useFormatSubscribers from "../hooks/useFormatSubscribers";
import useFormattedDate from "../hooks/useFormattedDate";
import CommentsContainer from "./CommentsContainer";
import RealatedVideos from "./RelatedVideos";
import useRelated from "../hooks/useRelated";
import Live from "./Live";
import { addSubscribe, removeSubscribe } from "../utils/subscribeSlice";
import { addLike, removeLike } from "../utils/likeVideoSlice";
import { addSave, removeSave } from "../utils/saveVideoSlice";

const Watch = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const video = useSelector((store) => store.video.watchVideo);
  const user = useSelector((store) => store.user.userInfo);
  const subscriptionDetail = useSelector((store) => store.subscribe.subDetail);
  const userSubscribers = useSelector(
    (store) => store.subscribers.userSubscribers
  );
  const likedVideos = useSelector((store) => store.likeUnlike.likeVideo);
  const savedVideos = useSelector((store) => store.save.savedVideos);
  const dispatch = useDispatch();

  const formatViews = useFormatViews();
  const formatSubscribers = useFormatSubscribers();
  const formattedDate = useFormattedDate();

  useSubscribe(video?.snippet?.channelId);
  useWatchVideo(videoId);
  useRelated();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleSubscribe = () => {
    const isSubscribed = userSubscribers.some(
      (ch) => ch.id === subscriptionDetail?.id
    );
    if (!isSubscribed) {
      dispatch(addSubscribe(subscriptionDetail));
    } else {
      dispatch(removeSubscribe(subscriptionDetail));
    }
  };

  const handleLike = () => {
    dispatch(addLike(video)); // Pass the video object to addLike action
  };

  const handleDislike = () => {
    dispatch(removeLike(video)); // Pass the video object to removeLike action
  };

  const handleSave = () => {
    const isSaved = savedVideos.some((v) => v.id === video?.id);
    if (!isSaved) {
      dispatch(addSave(video)); // Add the video to saved videos
    } else {
      dispatch(removeSave(video)); // Remove the video from saved videos
    }
  };

  const isLiked = likedVideos.some((v) => v.id === video?.id);
  const isSaved = savedVideos.some((v) => v.id === video?.id);

  const isSubscribed = userSubscribers.some(
    (ch) => ch.id === subscriptionDetail?.id
  );

  if (!video) return null;

  return (
    <div
      className={`2xl:flex 2xl:flex-col mt-20 bg-transparent ${
        isSidebarOpen ? "ml-[8rem] 2xl:ml-[17rem]" : "ml-[3rem] 2xl:ml-[7rem] "
      } h-full w-full overflow-hidden`}
    >
      <div className="2xl:flex">
        <div className="w-[90%] 2xl:w-[75%] h-full">
          <div className="h-[30vh] 2xl:h-[80vh] rounded-md">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
          {video && (
            <div>
              <div className="flex flex-wrap 2xl:justify-between">
                <div>
                  <div className="py-3 2xl:py-2">
                    <h1 className="text-sm font-bold text-white 2xl:text-lg">
                      {video?.snippet?.title}
                    </h1>
                  </div>
                  <div className="flex">
                    <div className="flex">
                      <div>
                        <img
                          className="rounded-full w-10 my-1"
                          src={
                            subscriptionDetail?.snippet?.thumbnails?.default
                              ?.url
                          }
                          alt="channelImg"
                        />
                      </div>
                      <div className="px-5 py-1 2xl:px-5">
                        <Link to={`/channel?c=${video?.snippet?.channelId}`}>
                          <h2 className="text-white font-semibold text-sm 2xl:text-xl">
                            {video?.snippet?.channelTitle}
                          </h2>
                        </Link>
                        <p className="text-gray-400 text-xs 2xl:my-1">
                          {formatSubscribers(
                            subscriptionDetail?.statistics?.subscriberCount
                          )}
                        </p>
                      </div>
                    </div>
                    {user && (
                      <div
                        className={` text-white border border-gray-300 rounded-full px-2 py-2 mx-2 my-3 2xl:px-5 2xl:mx-6 2xl:my-3 ${
                          isSubscribed ? "bg-red-600" : "bg-black"
                        } `}
                      >
                        <div
                          className="text-xs 2xl:text-lg font-semibold cursor-pointer"
                          onClick={handleSubscribe}
                        >
                          {userSubscribers.some(
                            (ch) => ch?.id === subscriptionDetail?.id
                          )
                            ? "Unsubscribe"
                            : "Subscribe"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {user && (
                  <div className="flex">
                    <div
                      className={`text-white border border-gray-300 rounded-full text-xs px-2 py-3 mx-2 my-3 2xl:px-5 2xl:py-2 2xl:mx-3 2xl:my-12 2xl:text-lg cursor-pointer ${
                        isLiked
                          ? "bg-blue-500 text-black"
                          : "bg-black opacity-25 hover:bg-gray-50 hover:opacity-70 hover:text-black"
                      }`}
                      onClick={handleLike}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />{" "}
                      {formatViews(video?.statistics?.likeCount)}
                    </div>
                    <div
                      className="text-white bg-black opacity-25 border border-gray-300 rounded-full text-xs px-3 py-3 mx-2 my-3 2xl:px-5 2xl:py-2 2xl:mx-3 2xl:my-12 2xl:text-lg hover:bg-gray-50 hover:opacity-70 hover:text-black cursor-pointer"
                      onClick={handleDislike}
                    >
                      Dislike{' '}
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </div>
                    <div
                      className={`text-white border text-xs border-gray-300 rounded-full px-3 py-3 mx-2 my-3 2xl:px-5 2xl:text-lg 2xl:py-2 2xl:mx-2 2xl:my-12 cursor-pointer ${
                        isSaved
                          ? "bg-blue-500 text-black"
                          : "bg-black opacity-25 hover:bg-gray-50 hover:opacity-70 hover:text-black"
                      }`}
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} className="mx-1 2xl:mx-2" />
                      {isSaved ? "Saved" : "Save"}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {isDescriptionExpanded ? (
                  <div className="text-white bg-black opacity-25 p-4 mt-4 rounded-lg text-[10px] 2xl:text-[14px]">
                    <div className="flex">
                      <h2 className="text-white font-semibold mx-2">
                        {formatViews(video?.statistics?.viewCount)} views
                      </h2>
                      <h2 className="text-white font-semibold ">
                        {formattedDate(video?.snippet?.publishedAt)}
                      </h2>
                    </div>
                    <div>
                      {video?.snippet?.tags?.map((item) => (
                        <p key={item} className="inline-block mr-2 mx-2">
                          #{item}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="mx-2">
                        {video?.snippet?.description}
                      </p>
                    </div>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={toggleDescription}
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <div className="text-white bg-black opacity-25 p-2 mt-1 rounded-lg text-[10px] 2xl:text-[14px] 2xl:mt-4 2xl:p-4">
                    <div className="flex">
                      <h2 className="text-white font-semibold mx-2 ]">
                        {formatViews(video?.statistics?.viewCount)} views
                      </h2>
                      <h2 className="text-white font-semibold">
                        {formattedDate(video?.snippet?.publishedAt)}
                      </h2>
                    </div>
                    <div>
                      {video?.snippet?.tags?.map((item) => (
                        <p key={item} className="inline-block mr-2 mx-2">
                          #{item}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="mx-2">
                        {video?.snippet?.description.substring(0, 100)}...
                      </p>
                    </div>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={toggleDescription}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>
              {video?.snippet?.liveBroadcastContent !== "live" && (
                <CommentsContainer />
              )}
            </div>
          )}
        </div>
        <div className="2xl:w-[25%] bg-transparent p-4 mx-6 h-full">
          {video?.snippet?.liveBroadcastContent === "live" && (
            <div className="border border-gray-400 rounded-xl mb-3 ">
              <Live />
            </div>
          )}{" "}
          <h2 className="text-white text-md font-semibold mb-3 2xl:text-lg">Up Next</h2>
          <div className="flex flex-col space-y-4 overflow-y-auto">
            <RealatedVideos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
