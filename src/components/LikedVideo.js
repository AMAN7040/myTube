import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormatViews from "../hooks/useFormatViews";
import useFormatPublishedDate from "../hooks/useFormatPublishedDate";
import { removeLike } from "../utils/likeVideoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const LikedVideo = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.likeUnlike.likeVideo);
  const isSidebarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const user = useSelector((store) => store.user.userInfo);
  const formatViews = useFormatViews();
  const formattedDate = useFormatPublishedDate();

  const [showDropdown, setShowDropdown] = useState(null); // State to manage dropdown visibility

  const handleRemoveLikedVideo = (videoId) => {
    dispatch(removeLike({ id: videoId })); // Dispatch removeLike action with video ID
    setShowDropdown(null); // Close dropdown after removing
  };

  const toggleDropdown = (videoId) => {
    setShowDropdown(showDropdown === videoId ? null : videoId); // Toggle dropdown visibility
  };

  if (!likedVideos) {
    return (
      <div
      className={`flex mt-20 bg-transparent ${
        isSidebarOpen ? "ml-[8rem] 2xl:ml-[17rem]" : "ml-[3rem] 2xl:ml-[6rem]"
      } h-screen w-full`}
      >
        <div className="w-1/5 bg-gradient-to-b from-red-400 rounded-xl">
          <img
           className="rounded-full w-1/2 mx-auto my-2 2xl:my-5"
            src={user?.photoUrl}
            alt="useImg"
          />
          <h1 className="font-bold text-xs text-center my-2 2xl:text-3xl 2xl:my-5">Liked Videos</h1>
          <p className="text-black font-semibold text-center my-2 text-xs 2xl:my-5 2xl:text-2xl">
            {user.displayName}
            {"  .  "} Videos -{likedVideos.length}
          </p>
        </div>
        <div className="w-3/5">
          <p className="text-center bg-transparent text-gray-400 mt-4">
            You haven't liked any videos yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
    className={`flex mt-20 bg-transparent ${
      isSidebarOpen ? "ml-[8rem] 2xl:ml-[17rem]" : "ml-[3rem] 2xl:ml-[6rem]"
    } h-screen w-full`}
    >
      <div className="w-1/5 bg-gradient-to-b from-red-400 rounded-xl">
        <img
          className="rounded-full w-1/2 mx-auto my-2 2xl:my-5"
          src={user?.photoUrl}
          alt="useImg"
        />
        <h1 className="font-bold text-xs text-center my-2 2xl:text-3xl 2xl:my-5">Liked Videos</h1>
        <p className="text-black font-semibold text-center my-2 text-xs 2xl:my-5 2xl:text-2xl">
          {user.displayName}
          {"  .  "} Videos -{likedVideos.length}
        </p>
      </div>
      <div className="w-3/5">
        {likedVideos &&
          likedVideos.map((video) => (
            <div className="2xl:flex">
              <div className="w-[100%] mx-1 my-1 2xl:w-[30%] 2xl:mx-10 2xl:my-5">
                <img
                  className="rounded-xl mx-3 2xl:mx-5"
                  src={video?.snippet?.thumbnails?.medium?.url}
                  alt="videoImg"
                />
              </div>
              <div className="my-1 w-full 2xl:my-5">
                <div className="flex justify-between">
                <div className="text-white mx-3 text-xs my-1 2xl:text-lg 2xl:my-2">{video?.snippet?.title}</div>
                <div className="my-1 mx-0 relative right-0 2xl:my-2 2xl:mx-5 2xl:right-5">
                    <button
                      onClick={() => toggleDropdown(video.id)}
                      className="text-white"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="text-white"
                      />
                    </button>
                    {showDropdown === video.id && (
                     <div className="absolute bg-white rounded-xl shadow-lg mx-2 -my-6 2xl:right-2 2xl:mx-4 2xl:-my-7 ">
                     <button
                       className="block text-gray-700 px-1 py-1 text-xs hover:bg-gray-200 w-full text-left 2xl:px-4 2xl:py-2 2xl:text-sm"
                          onClick={() => handleRemoveLikedVideo(video.id)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-2 mx-2 text-[10px] 2xl:my-2 2xl:text-sm">
                  <h2 className="text-gray-400 mx-1">
                    {video?.snippet?.channelTitle}
                    {" . "}
                  </h2>
                  <p className="text-gray-400 mx-1">
                    {formatViews(video?.statistics?.viewCount)}
                    {" . "}
                  </p>
                  <p className="text-gray-400 mx-1">
                    {formattedDate(video?.snippet?.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LikedVideo;
