import React from "react";
import { useSelector } from "react-redux";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";
import useFormatViews from "../hooks/useFormatViews";

const RelatedCard = ({ item }) => {
  const { snippet, statistics } = item;
  const { channelTitle, thumbnails, title, publishedAt } = snippet;
  const { viewCount } = statistics;

  const formatViews = useFormatViews();
  const formatPublishedDate = useFormatPublishedDate();

  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`${
        isBarOpen ? "w-full" : "w-[70%]]"
      } my-2 shadow-lg bg-transparent flex`}
    >
      <img
        src={thumbnails.default.url}
        alt="video"
        className="rounded-xl w-[50%] mb-3"
      />
      <div className="w-[50%] px-1 py-1 2xl:px-2 2xl:py-2">
        <div className="font-semibold text-[9px] 2xl:text-[14px] text-white mb-2">{title}</div>
        <div className="flex  mb-2">
          {/* <img src={channelPhotoUrl} alt="channel" className="w-10 h-10 rounded-full mr-2" /> */}
          <div className="text-[9px] 2xl:text-[12px]">
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

export default RelatedCard;
