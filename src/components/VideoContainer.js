import React, { useCallback, useState } from "react";
import useAllVideos from "../hooks/useAllVideos";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Shimmer from './Shimmer'

const VideoContainer = () => {
  const nextPageToken = useSelector((store) => store.video.nextPageToken);
  const [page, setPage] = useState(nextPageToken); // State to hold the current page token
  const { loading, error, setLoading } = useAllVideos(page); // Fetch videos based on current page

  // Callback to load more videos
  const loadMoreVideos = useCallback(() => {
    if (!loading) {
      setLoading(true);
      setPage(nextPageToken);
    }
  }, [loading, nextPageToken]);

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
      {loading && (<Shimmer isBarOpen={isBarOpen}/>)}
      {error && (
        <p className="pt-5" style={{ color: "red" }}>
          Error: {error}
        </p>
      )}
      {videos.map((video, index) => (
        <Link to={`/watch?v=${video.id}`} key={video.id + index}>
          <VideoCard item={video} />
        </Link>
      ))}
      {nextPageToken && <div ref={targetRef} style={{ height: "10px" }}></div>}
    </div>
  );
};

export default VideoContainer;
