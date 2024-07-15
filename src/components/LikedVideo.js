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
        className={` flex mt-20 bg-transparent ${
          isSidebarOpen ? "ml-[15rem]" : "ml-[6rem]"
        } h-screen w-full`}
      >
        <div className="w-1/5 bg-gradient-to-b from-red-400 rounded-xl">
          <img
            className="rounded-full w-1/2 mx-auto my-5"
            src={user?.photoUrl}
            alt="useImg"
          />
          <h1 className="font-bold text-3xl text-center my-5">Liked Videos</h1>
          <p className="text-black font-semibold text-center my-5">
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
        isSidebarOpen ? "ml-[15rem]" : "ml-[6rem]"
      } h-screen w-full`}
    >
      <div className="w-1/5 bg-gradient-to-b from-red-400 rounded-xl">
        <img
          className="rounded-full w-1/2 mx-auto my-5"
          src={user?.photoUrl}
          alt="useImg"
        />
        <h1 className="font-bold text-3xl text-center my-5">Liked Videos</h1>
        <p className="text-black font-semibold text-center my-5">
          {user.displayName}
          {"  .  "} Videos -{likedVideos.length}
        </p>
      </div>
      <div className="w-3/5">
        {likedVideos &&
          likedVideos.map((video) => (
            <div className="flex">
              <div className="w-[30%] mx-10 my-5">
                <img
                  className="rounded-xl mx-5"
                  src={video?.snippet?.thumbnails?.medium?.url}
                  alt="videoImg"
                />
              </div>
              <div className="my-5 w-full">
                <div className="flex justify-between">
                  <div className="text-white my-2">{video?.snippet?.title}</div>
                  <div className="my-2 mx-5 relative right-5">
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
                      <div className="absolute right-2 bg-white rounded-xl shadow-lg mx-4 -my-7 ">
                        <button
                          className="block text-gray-700 px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                          onClick={() => handleRemoveLikedVideo(video.id)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex my-2 text-sm">
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
