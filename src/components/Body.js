import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'

const Body = () => {
  return (
    <div className='flex bg-black opacity-90'>
      <SideBar/>
      <MainContainer/>
    </div>
  )
}

export default Body