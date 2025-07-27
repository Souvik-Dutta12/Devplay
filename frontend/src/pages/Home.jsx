import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home = ({sidebarOpen}) => {

  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} category={category} setCategory={setCategory}/>

      <div className={` pr-0 md:pr-3 pt-2 pb-2 duration-500 ${sidebarOpen ? 'pl-0 md:pl-75' : 'pl-0 md:pl-25'}`}>
        <Feed category={category}/>
      </div>
      
    </>
  )
}

export default Home
