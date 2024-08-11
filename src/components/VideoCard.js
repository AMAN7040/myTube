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
        isBarOpen ? "w-[90%] md:w-[90%] lg:w-[90%] 2xl:w-[92%] " : "w-[90%] md:w-[85%] lg:w-[90%] 2xl:w-[90%]"
      } my-2 mx-1 2xl:my-1 bg-transparent p-0 `}
    >
      <img
        src={thumbnails.medium.url}
        alt="video thumbnail"
        className="w-full rounded-xl object-cover"
      />
      <div className="px-2 py-2 2xl:px-5">
        <div className="font-bold text-[0.8rem] md:text-[0.9rem] lg:text-[0.85rem] 2xl:text-[0.9rem] text-white mb-2 h-full">{title.length > 80 ? `${title.substring(0, 80)}...` : title}</div>
        <div className="flex mb-2 2xl:mb-4 ">
          <div className="text-[0.7rem] md:[0.75rem] lg:text-[0.78rem] 2xl:text-[0.8rem]">
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
