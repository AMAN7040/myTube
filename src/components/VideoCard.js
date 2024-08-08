import React from "react";
import { useSelector } from "react-redux";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";
import useFormatViews from "../hooks/useFormatViews";

const VideoCard = ({ item }) => {
  const { snippet, statistics } = item;
  const { channelTitle, thumbnails, title, publishedAt } = snippet;
  const { viewCount } = statistics;

  const formatViews = useFormatViews();
  const formatPublishedDate = useFormatPublishedDate();

  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`${
        isBarOpen ? "w-[90%] md:w-[280px] lg:w-[240px] 2xl:w-[470px] " : "w-[90%] md:w-[320px] lg:w-[270px] 2xl:w-[400px]"
      } my-1 2xl:my-1 shadow-lg bg-transparent `}
    >
      <img
        src={thumbnails.medium.url}
        alt="video"
        className="w-full rounded-xl"
      />
      <div className="px-2 py-2 2xl:px-5">
        <div className="font-bold text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[16px] text-white mb-2">{title}</div>
        <div className="flex mb-2 2xl:mb-4">
          {/* <img src={channelPhotoUrl} alt="channel" className="w-10 h-10 rounded-full mr-2" /> */}
          <div className="text-sm lg:text-sm 2xl:text-sm">
            <p className="text-gray-500 leading-none mb-1">{channelTitle}</p>
            <p className="text-gray-500">
              {formatViews(viewCount)} views •{" "}
              {formatPublishedDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
