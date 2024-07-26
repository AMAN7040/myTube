import React from 'react'
import useRelated from '../hooks/useRelated'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RelatedCard from './RelatedCard';

const RelatedVideos = () => {
  const videos = useSelector((store)=> store.video.relatedVideos);
  useRelated();
 
  if(!videos) return (<p className='text-white text-md 2xl:text-lg '>No related Videos</p>)

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