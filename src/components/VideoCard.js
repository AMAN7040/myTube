import React from "react";
import { useSelector } from "react-redux";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";
import useFormatViews from "../hooks/useFormatViews";
import useSubscribe from "../hooks/useSubscribe";

const VideoCard = ({ item }) => {
  const { snippet, statistics } = item;
  const { channelTitle, thumbnails, title, publishedAt, channelId } = snippet;
  const { viewCount } = statistics;

  const formatViews = useFormatViews();
  const formatPublishedDate = useFormatPublishedDate();
  useSubscribe(channelId);

  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`${
        isBarOpen ? "w-[470px] " : "w-[400px]"
      } my-2 shadow-lg bg-transparent `}
    >
      <img
        src={thumbnails.medium.url}
        alt="video"
        className="w-full rounded-xl"
      />
      <div className="px-5 py-2">
        <div className="font-bold text-md text-white mb-2">{title}</div>
        <div className="flex  mb-4">
          {/* <img src={channelPhotoUrl} alt="channel" className="w-10 h-10 rounded-full mr-2" /> */}
          <div className="text-sm">
            <p className="text-gray-500 leading-none mb-1">{channelTitle}</p>
            <p className="text-gray-500">
              {formatViews(viewCount)} views • {formatPublishedDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
