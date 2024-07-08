import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useWatchVideo from "../hooks/useWatchVideo";
import useFormatViews from "../hooks/useFormatViews";
import useSubscribe from "../hooks/useSubscribe";
import useFormatSubscribers from "../hooks/useFormatSubscribers";
import useFormattedDate from "../hooks/useFormattedDate";
import CommentsContainer from "./CommentsContainer";
import RealatedVideos from "./RelatedVideos";

const Watch = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const video = useSelector((store) => store.video.watchVideo);
  const subscriptionDetail = useSelector((store) => store.subscribe.subDetail);

  const formatViews = useFormatViews();
  const formatSubscribers = useFormatSubscribers();
  const formattedDate = useFormattedDate();

  useSubscribe(video?.snippet?.channelId);
  useWatchVideo(videoId);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (!video) return null;

  return (
    <div className={`flex flex-col mt-20 bg-transparent ${isSidebarOpen ? "ml-[15rem]" : "ml-[6rem]"} h-full w-full overflow-hidden`}>
      <div className="flex">
        <div className="w-[75%] h-full">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="80vh"
            playing={true}
          />
          {video && (
            <div>
              <div className="flex justify-between">
                <div>
                  <div className="py-2">
                    <h1 className="text-lg font-bold text-white">{video?.snippet?.title}</h1>
                  </div>
                  <div className="flex">
                    <div className="flex">
                      <div>
                        <img
                          className="rounded-full w-14"
                          src={subscriptionDetail?.snippet?.thumbnails?.default?.url}
                          alt="channelImg"
                        />
                      </div>
                      <div className="px-5 py-1">
                        <h2 className="text-white font-semibold text-xl">{video?.snippet?.channelTitle}</h2>
                        <p className="text-gray-400 text-xs my-1">
                          {formatSubscribers(subscriptionDetail?.statistics?.subscriberCount)}
                        </p>
                      </div>
                    </div>
                    <div className="text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-1 mx-6 my-3 hover:bg-gray-50 hover:opacity-70 hover:text-black cursor-pointer">
                      <div className="text-lg font-semibold">Subscribe</div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-2 mx-3 my-12 hover:bg-gray-50 hover:opacity-70 hover:text-black cursor-pointer">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {formatViews(video?.statistics?.likeCount)}
                  </div>
                  <div className="text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-2 mx-3 my-12 hover:bg-gray-50 hover:opacity-70 hover:text-black cursor-pointer">
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </div>
                </div>
              </div>
              <div>
                {isDescriptionExpanded ? (
                  <div className="text-white bg-black opacity-25 p-4 mt-4 rounded-lg">
                    <div className="flex">
                      <h2 className="text-white font-semibold text-sm mx-2">
                        {formatViews(video?.statistics?.viewCount)} views
                      </h2>
                      <h2 className="text-white font-semibold text-sm">
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
                      <p className="mx-2 text-sm">{video?.snippet?.description}</p>
                    </div>
                    <button className="text-blue-500 mt-2" onClick={toggleDescription}>
                      Show Less
                    </button>
                  </div>
                ) : (
                  <div className="text-white bg-black opacity-25 p-4 mt-4 rounded-lg">
                    <div className="flex">
                      <h2 className="text-white font-semibold text-sm mx-2">
                        {formatViews(video?.statistics?.viewCount)} views
                      </h2>
                      <h2 className="text-white font-semibold text-sm">
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
                      <p className="mx-2 text-sm">{video?.snippet?.description.substring(0, 100)}...</p>
                    </div>
                    <button className="text-blue-500 mt-2" onClick={toggleDescription}>
                      Show More
                    </button>
                  </div>
                )}
              </div>
              <CommentsContainer />
            </div>
          )}
        </div>
        <div className="w-[25%] bg-transparent p-4 mx-6 h-full">
          <h2 className="text-white text-lg font-semibold mb-3">Up Next</h2>
          {/* Placeholder for related videos */}
          <div className="flex flex-col space-y-4 overflow-y-auto">
            <RealatedVideos/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
