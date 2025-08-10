import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const Home = ({sidebarOpen,setSidebarOpen}) => {

  const [category, setCategory] = useState("");

  const {user} = useAppContext();

  return (
    
      user ? (
        <>
        <Sidebar sidebarOpen={sidebarOpen} category={category} setCategory={setCategory}/>

      <div className={` pr-0 md:pr-3 pt-2 pb-2 duration-500 ${sidebarOpen ? 'pl-0 md:pl-75' : 'pl-0 md:pl-25'}`}>
      <Feed setSidebarOpen={setSidebarOpen}/>
      </div>
    </>
    ):<Navigate to={"/signup"}/>
      
    
  )
}

export default Home
