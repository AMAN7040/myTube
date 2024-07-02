import React, {  } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useWatchVideo from "../hooks/useWatchVideo";
import ReactPlayer from "react-player";
import useFormatViews from "../hooks/useFormatViews";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";
import useSubscribe from "../hooks/useSubscribe";
import useFormatSubscribers from "../hooks/useFormtSubscribers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/fontawesome-free-solid";

const Watch = () => {
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const [searchParams] = useSearchParams();
  const param = searchParams.get("v");
  const WatchVideo = useSelector((store) => store.video.WatchVideo);
  const sub = useSelector((store) => store.subscribe.subDetail);
  

  const formatViews = useFormatViews();
  const formatPublishedDate = useFormatPublishedDate();
  const formatSubscribers = useFormatSubscribers();

  useSubscribe(WatchVideo?.snippet?.channelId);
  useWatchVideo(param);

  if (!WatchVideo) return null;

  return (
    <div
      className={`mt-24 transition-all rounded-lg duration-300 bg-transparent ${
        isBarOpen ? "ml-[15rem]" : "ml-[6rem]"
      } h-full w-full`}
      
    >
      <div className="w-full flex ">
        <div className="w-[75%] h-full ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${param}`}
            controls
            width="100%"
            height="80vh"
            playing={true}
          />
          {WatchVideo && (
            <div className="">
              <div className="flex justify-between">
                <div>
                  <div className="py-2">
                    <h1 className="text-lg font-bold text-white">
                      {WatchVideo?.snippet?.title}
                    </h1>
                  </div>
                  <div className="flex">
                    <div className="flex">
                      <div>
                        <img
                          className="rounded-full w-14"
                          src={sub?.snippet?.thumbnails?.default?.url}
                          alt="channleImg"
                        />
                      </div>
                      <div className="px-5 py-1">
                        <h2 className="text-white font-semibold text-lg">
                          {WatchVideo?.snippet?.channelTitle}
                        </h2>
                        <p className="text-gray-400 text-xs my-1">
                          {formatSubscribers(sub?.statistics?.subscriberCount)}
                        </p>
                      </div>
                    </div>
                    <div className=" text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-1 mx-6 my-3 hover:bg-gray-50 hover:opacity-70 hover:text-black">
                      <div className="text-lg font-semibold">Subscribe</div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-2 mx-3 my-12 hover:bg-gray-50 hover:opacity-70 hover:text-black">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {formatViews(WatchVideo?.statistics?.likeCount)}
                  </div>
                  <div className="text-white bg-black opacity-25 border border-gray-300 rounded-full px-5 py-2 mx-3 my-12 hover:bg-gray-50 hover:opacity-70 hover:text-black">
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </div>
                </div>
              </div>
              <div className="text-white bg-black opacity-25">
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
                Comments
              </div>
            </div>
          )}
        </div>
        <div className="w-[25%] bg-transparent p-4 mx-6">
          <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
          {/* Placeholder for related videos */}
          <div>related videos</div>
        </div>
      </div>
      
    </div>
  );
};

export default Watch;
