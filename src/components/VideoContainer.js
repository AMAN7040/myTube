import React from "react";
import useAllVideos from "../hooks/useAllVideos";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const { loading, error } = useAllVideos();
  const videos = useSelector((store) => store.video.allVideos);
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`grid pl-10 ${
        isBarOpen ? "grid-cols-3" : "grid-cols-4"
      } bg-transparent w-full`}
    >
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {videos &&
        videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <VideoCard  item={video} />
          </Link>
        ))}
    </div>
  );
};

export default VideoContainer;
