import React, { useState } from "react";
import useAllVideos from "../hooks/useAllVideos";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const VideoContainer = () => {
  const nextPageToken = useSelector((store) => store.video.nextPageToken);
  const [page, setPage] = useState(nextPageToken); // State to hold the current page token
  const { loading, error, setLoading } = useAllVideos(page); // Fetch videos based on current page

  // Callback to load more videos
  const loadMoreVideos = () => {
    if (!loading) {
      setLoading(true); // Set loading state
      setPage(nextPageToken); // Update page token
    }
  };

  // Hook for infinite scroll
  const targetRef = useInfiniteScroll(loadMoreVideos);

  const videos = useSelector((store) => store.video.allVideos);
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`grid pl-10 ${
        isBarOpen ? "grid-cols-3" : "grid-cols-4"
      } bg-transparent w-full`}
    >
      {loading && <p className="text-white">Loading...</p>}
      {error && (
        <p className="pt-5" style={{ color: "red" }}>
          Error: {error}
        </p>
      )}
      {videos.map((video) => (
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard item={video} />
        </Link>
      ))}
      <div ref={targetRef} style={{ height: "10px" }}></div> {/* Ref for infinite scroll */}
    </div>
  );
};

export default VideoContainer;
