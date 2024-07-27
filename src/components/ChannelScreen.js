import React, { useState } from "react";
import useChannel from "../hooks/useChannel";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFormatSubscribers from "../hooks/useFormatSubscribers";
import { addSubscribe, removeSubscribe } from "../utils/subscribeSlice";

const ChannelScreen = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("c");
  const dispatch = useDispatch();
  useChannel(channelId);
  const isSidebarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const { channelDetails, channelVideos } = useSelector(
    (store) => store.channel
  );

  const userSubscribers = useSelector(
    (store) => store.subscribers.userSubscribers
  );

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const formatSubscribers = useFormatSubscribers();

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  const handleSubscribe = () => {
    const isSubscribed = userSubscribers.some((ch) => ch.id === channelId);
    if (!isSubscribed) {
      dispatch(addSubscribe(channelDetails));
    } else {
      dispatch(removeSubscribe(channelDetails));
    }
  };
  const isSubscribed = userSubscribers.some((ch) => ch.id === channelId);

  if (!channelDetails) return null;
  return (
    <div
      className={`flex flex-col mt-20 bg-transparent ${
        isSidebarOpen ? "ml-[5rem]" : "ml-[2rem] 2xl:ml-[6rem]"
      } h-full w-full overflow-hidden`}
    >
      <div className="flex justify-center mb-7">
        <img
          src={channelDetails?.snippet?.thumbnails?.high?.url}
          alt="channel_bg"
          className="w-[65vw] h-[15vh] 2xl:w-[60vw] 2xl:h-[20vh] rounded-lg opacity-70 "
        />
      </div>
      <div className="flex ml-[18%]">
        <div className="my-2">
          <img
            src={channelDetails?.snippet?.thumbnails?.medium?.url}
            alt="channel_profile"
            className="w-40 h-40 rounded-full "
          />
        </div>
        <div className="my-2 mx-10">
          <h1 className="text-white text-4xl font-bold my-2">
            {channelDetails?.snippet.title}
          </h1>
          <h3 className="text-gray-500 text-md my-2">
            {channelDetails?.snippet.customUrl} {"  :  "}{" "}
            {formatSubscribers(channelDetails?.statistics?.subscriberCount)}{" "}
            {"  :  "} {channelDetails?.statistics?.videoCount} videos
          </h3>
          {isDescriptionExpanded ? (
            <div className="flex">
              <p className="text-gray-400 my-2">
                {" "}
                {channelDetails?.snippet.description}
              </p>{" "}
              <button className="text-gray-400" onClick={toggleDescription}>
                Show Less
              </button>
            </div>
          ) : (
            <div className="flex">
              <p className="text-gray-400 my-2">
                {" "}
                {channelDetails?.snippet.description?.substring(0, 100)}...
              </p>{" "}
              <button className="text-gray-400" onClick={toggleDescription}>
                More
              </button>
            </div>
          )}
          <div
            className={` text-white text-center w-[20%] border border-gray-300 rounded-full px-4 py-1 my-3 cursor-pointer ${
              isSubscribed ? "bg-red-600" : "bg-black"
            } `}
          >
            <div className="text-lg font-semibold" onClick={handleSubscribe}>
              {userSubscribers.some((ch) => ch?.id === channelId)
                ? "Unsubscribe"
                : "Subscribe"}
            </div>
          </div>
        </div>
      </div>      
      <div className="mx-auto grid grid-cols-4">
        {channelVideos &&
          channelVideos.map((video) => (
            <div className="w-[18vw] my-5 mx-2">
              <img
                src={video?.snippet?.thumbnails?.medium?.url}
                alt="video"
                className="w-full rounded-xl"
              />
              <h2 className="text-white mx-2 my-2 ">{video?.snippet?.title}</h2>
              <p className="text-gray-500">11k views . 1 year ago</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChannelScreen;
