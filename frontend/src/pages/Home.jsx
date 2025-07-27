import React from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home = ({sidebarOpen}) => {
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen}/>

      <div className={` pr-0 md:pr-3 pt-2 pb-2 duration-500 ${sidebarOpen ? 'pl-0 md:pl-75' : 'pl-0 md:pl-25'}`}>
        <Feed />
      </div>
      
    </>
  )
}

export default Home
