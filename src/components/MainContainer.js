import React from 'react'
import ButtonBar from './ButtonBar'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux';

const MainContainer = () => {
  
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div className={`mt-16 ${isBarOpen ? 'ml-[16.5rem]' : 'ml-[7rem]'} transition-all duration-300 bg-black opacity-90`}>
        <ButtonBar/>
        <VideoContainer/>
    </div>
  )
}

export default MainContainer