import React from 'react'
import useRelated from '../hooks/useRelated'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RelatedCard from './RelatedCard';

const RelatedVideos = () => {
  const videos = useSelector((store)=> store.video.relatedVideos);
  useRelated();
  return (
    <div>
      {videos && videos.map((video, index) => (
        <Link to={`/watch?v=${video.id}`} key={video.id + index}>
          <RelatedCard  item={video}/>
        </Link>
      ))}
    </div>
  )
}

export default RelatedVideos