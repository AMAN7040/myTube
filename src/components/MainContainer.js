import React from 'react'
import ButtonBar from './ButtonBar'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux';

const MainContainer = () => {
  
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div className={`mt-14 ${isBarOpen ? 'ml-[15rem] w-[1661px]' : 'ml-[6rem] w-[1805px]'} transition-all duration-300 bg-black opacity-90 h-full `}>
        <ButtonBar/>
        <VideoContainer/>
    </div>
  )
}

export default MainContainer