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
  const user = useSelector((store) => store.user.userInfo);

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
        isSidebarOpen ? "ml-[4.2rem] md:ml-[3.8rem]" : "ml-[1rem] md:ml-[1.2rem] 2xl:ml-[6rem]"
      } h-full w-full overflow-hidden`}
    >
      <div className="flex justify-center mb-2 md:mb-3 2xl:mb-7">
        <img
          src={channelDetails?.snippet?.thumbnails?.high?.url}
          alt="channel_bg"
          className="w-[60vw] h-[15vh] md:w-[70vw] md:h-[17vh]  2xl:w-[60vw] 2xl:h-[20vh] rounded-lg opacity-70 "
        />
      </div>
      <div className="flex ml-[15%] md:ml-[15%] lg:ml-[18%] 2xl:ml-[15%]">
        <div className="my-2">
          <img
            src={channelDetails?.snippet?.thumbnails?.medium?.url}
            alt="channel_profile"
            className="hidden md:block md:w-16 md:h-16 lg:block lg:w-20 lg:h-20 2xl:block 2xl:w-40 2xl:h-40 rounded-full "
          />
        </div>
        <div className="my-1 mx-3 2xl:my-2 2xl:mx-10">
          <h1 className="text-white text-sm font-bold my-1 md:text-lg lg:text-xl 2xl:text-4xl 2xl:my-2">
            {channelDetails?.snippet.title}
          </h1>
          <h3 className="text-gray-500 text-[9px] my-1 md:text-[13px] lg:text-[15px] 2xl:text-[16px] 2xl:my-2">
            {channelDetails?.snippet.customUrl} {"  :  "}{" "}
            {formatSubscribers(channelDetails?.statistics?.subscriberCount)}{" "}
            {"  :  "} {channelDetails?.statistics?.videoCount} videos
          </h3>
          {isDescriptionExpanded ? (
            <div>
              <p className="text-gray-400 text-[9px] md:text-[13px] lg:text-[15px] 2xl:my-2 2xl:text-[16px]">
                {" "}
                {channelDetails?.snippet.description}
              </p>{" "}
              <button className="text-gray-400 text-[9px] md:text-[13px] lg:text-[15px] 2xl:text-[16px]" onClick={toggleDescription}>
                Show Less
              </button>
            </div>
          ) : (
            <div className="flex-col 2xl:">
              <p className="text-gray-400 my-1 text-[9px] md:text-[13px] lg:text-[15px] 2xl:my-2 2xl:text-[16px]">
                {" "}
                {channelDetails?.snippet.description?.substring(0, 100)}...
              </p>{" "}
              <button className="text-gray-400 text-[9px] md:text-[13px] lg:text-[15px] 2xl:text-[16px]" onClick={toggleDescription}>
                More
              </button>
            </div>
          )}
          {user && (<div
            className={` text-white text-center w-[25%]  border border-gray-300 rounded-full px-2 py-1 my-2 lg:px-2 lg:w-[20%] lg:my-3 2xl:px-4 2xl:w-[20%] 2xl:py-1 2xl:my-3 cursor-pointer ${
              isSubscribed ? "bg-red-600" : "bg-black"
            } `}
          >
            <div className="text-[9px] md:text-[13px] 2xl:text-lg font-semibold" onClick={handleSubscribe}>
              {userSubscribers.some((ch) => ch?.id === channelId)
                ? "Unsubscribe"
                : "Subscribe"}
            </div>
          </div>)}
        </div>
      </div>      
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {channelVideos &&
          channelVideos.map((video) => (
            <div className="w-[50vw] my-2 mx-1 md:w-[30vw] md:mx-3 md:my-3 lg:w-[20vw] lg:mx-4 lg:my-3 2xl:w-[18vw] 2xl:my-5 2xl:mx-2">
              <img
                src={video?.snippet?.thumbnails?.medium?.url}
                alt="video"
                className="w-full rounded-xl"
              />
              <h2 className="text-white mx-1 my-1 text-[11px] md:text-[12px] lg:text-[11px] 2xl:mx-2 2xl:my-2 2xl:text-md">{video?.snippet?.title}</h2>
              <p className="text-gray-500 mx-1 text-[9px] md:text-[11px] lg:text-[10px] 2xl:mx-2 2xl:text-md">11k views . 1 year ago</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChannelScreen;
