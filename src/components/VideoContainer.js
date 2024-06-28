import React from "react";
import useAllVideos from "../hooks/useAllVideos";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const { loading, error } = useAllVideos();
  const videos = useSelector((store) => store.video.allVideos);
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div className={`grid pl-10 ${isBarOpen ? 'grid-cols-3' : 'grid-cols-4'} bg-transparent w-full `}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {videos &&
        videos.map((video) => <VideoCard key={video.id} item={video} />)}
    </div>
  );
};

export default VideoContainer;
