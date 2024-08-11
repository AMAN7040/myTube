import React, { memo, useCallback, useState } from "react";
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

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded((prev) => !prev);
  }, []);

  const handleSubscribe = useCallback(() => {
    const isSubscribed = userSubscribers.some(
      (ch) => ch.id === subscriptionDetail?.id
    );
    if (!isSubscribed) {
      dispatch(addSubscribe(subscriptionDetail));
    } else {
      dispatch(removeSubscribe(subscriptionDetail));
    }
  }, [dispatch, subscriptionDetail, userSubscribers]);

  const handleLike = useCallback(() => {
    dispatch(addLike(video));
  }, [dispatch, video]);

  const handleDislike = useCallback(() => {
    dispatch(removeLike(video));
  }, [dispatch, video]);

  const handleSave = useCallback(() => {
    const isSaved = savedVideos.some((v) => v.id === video?.id);
    if (!isSaved) {
      dispatch(addSave(video));
    } else {
      dispatch(removeSave(video));
    }
  }, [dispatch, savedVideos, video]);

  const isLiked = likedVideos.some((v) => v.id === video?.id);
  const isSaved = savedVideos.some((v) => v.id === video?.id);

  const isSubscribed = userSubscribers.some(
    (ch) => ch.id === subscriptionDetail?.id
  );

  if (!video) return null;

  return (
    <div
      className={`lg:flex lg:flex-col 2xl:flex 2xl:flex-col mt-20 bg-transparent ${
        isSidebarOpen ? "ml-[6.9rem] md:ml-[9rem] 2xl:ml-[17rem]" : "ml-[1.2rem] md:ml-[4rem] 2xl:ml-[7rem] "
      } h-full w-full overflow-hidden`}
    >
      <div className="lg:flex 2xl:flex">
        <div className="w-[95%] md:w-[97%] lg:w-[69%] 2xl:w-[75%] h-full">
          <div className="h-[30vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[80vh]">
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
                  <div className="py-3 lg:py-3 2xl:py-2">
                    <h1 className="text-sm font-bold text-white md:text-[13px] lg:text-[14px] 2xl:text-lg">
                      {video?.snippet?.title}
                    </h1>
                  </div>
              <div className="flex flex-col md:flex-row lg:flex-row 2xl:flex-row md:justify-between lg:justify-between 2xl:justify-between">
                <div className="">
                  <div className="flex space-x-6 lg:space-x-5">
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
                      <div className="px-4 py-1">
                        <Link to={`/channel?c=${video?.snippet?.channelId}`}>
                          <h2 className="text-white font-semibold text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-xl">
                            {video?.snippet?.channelTitle}
                          </h2>
                        </Link>
                        <p className="text-gray-400 text-[10px] lg:text-[10px] 2xl:text-xs lg:my-1 2xl:my-1">
                          {formatSubscribers(
                            subscriptionDetail?.statistics?.subscriberCount
                          )}
                        </p>
                      </div>
                    </div>
                    {user && (
                      <div
                        className={` text-white border border-gray-300 rounded-3xl px-3 py-3 mx-4 my-1 ${
                          isSubscribed ? "bg-red-600" : "bg-black"
                        } `}
                      >
                        <div
                          className="text-[0.5rem] md:text-[0.65rem] lg:text-[0.75rem] 2xl:text-[0.9rem] font-semibold cursor-pointer"
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
                  <hr className="my-3 block md:hidden lg:hidden 2xl:hidden"></hr>
                </div>
                {user && (
                  <div className="flex justify-start space-x-5 lg:space-x-4 text-[0.7rem] lg:text-[0.85] 2xl:text-[0.9rem]">
                    <div
                      className={`flex items-center text-white border border-gray-300 rounded-3xl px-4 py-3 mx-1 my-1 ${
                        isLiked
                          ? "bg-blue-500 text-black"
                          : "bg-black opacity-25 hover:bg-gray-50 hover:opacity-70 hover:text-black"
                      }`}
                      onClick={handleLike}
                    >
                      <FontAwesomeIcon className="mx-[3px]" icon={faThumbsUp} />{" "}
                      {formatViews(video?.statistics?.likeCount)}
                    </div>
                    <div
                      className="text-white flex items-center bg-black opacity-25 border border-gray-300 rounded-3xl px-4 py-3 mx-1 my-1"
                      onClick={handleDislike}
                    >
                      <span className="hidden md:block lg:block 2xl:block">Dislike{' '}</span>
                      <FontAwesomeIcon className="mx-[3px]" icon={faThumbsDown} />
                    </div>
                    <div
                      className={`text-white border border-gray-300 rounded-3xl px-4 py-3 mx-1 my-1 ${
                        isSaved
                          ? "bg-blue-500 text-black"
                          : "bg-black opacity-25 hover:bg-gray-50 hover:opacity-70 hover:text-black"
                      }`}
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} className="mx-[3px]" />
                      {isSaved ? "Saved" : "Save"}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {isDescriptionExpanded ? (
                  <div className="text-white bg-black opacity-25 p-4 mt-2 rounded-lg text-[10px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]">
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
                  <div className="text-white bg-black opacity-25 p-2 mt-1 rounded-lg text-[10px] md:text-[12px] lg:text-[13px] lg:-mt-1 2xl:text-[14px] 2xl:mt-4 2xl:p-4">
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
                        <p key={item} className="inline-block mr-2 mx-1">
                          #{item}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="mx-2">
                        {video?.snippet?.description.substring(0, 50)}...
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
        <div className="lg:w-[35%] 2xl:w-[25%] bg-transparent p-4 mx-6 lg:mx-4 h-full">
          {video?.snippet?.liveBroadcastContent === "live" && (
            <div className="border border-gray-400 rounded-xl mb-3 ">
              <Live />
            </div>
          )}{" "}
          <h2 className="text-white text-md font-semibold mb-3 lg:text-lg 2xl:text-lg">Up Next</h2>
          <div className="flex flex-col space-y-4 overflow-y-auto">
            <RealatedVideos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Watch);
