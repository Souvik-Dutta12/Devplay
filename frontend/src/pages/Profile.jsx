import React from 'react'
import Sidebar from '../components/Sidebar'
import thumbnail from '/thumbnil.jpeg'
import { Link } from 'react-router-dom'
const Profile = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`  mt-5 pr-0 md:pr-3 pt-2 pb-2 duration-500 flex flex-col gap-7 ${sidebarOpen ? 'pl-0 md:pl-75 mx-5 md:mx-25' : 'pl-0 md:pl-25 mx-5 md:mx-30'}`}>
        <div className='w-full  h-40 rounded-xl overflow-hidden'>
          <img className='w-full h-full object-cover' src={thumbnail} alt="" />
        </div>

        <div className='w-full h-auto flex flex-col md:flex-row gap-3 items-center '>

          <div className='w-45 h-45 rounded-full overflow-hidden'>
            <img className='w-auto h-full object-center ' src={thumbnail} alt="" />
          </div>
          <div className='flex flex-col gap-2  items-center md:items-start'>
            <h1 className='text-5xl font-bold'>Souvik Dutta</h1>
            <div className='text-md '>
              <b>@souvik</b> &bull; <span className='text-base-content/60'>1115K subscribers</span> &bull; <span className='text-base-content/60'>290 videos</span>
            </div>
            <p className='text-md'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, deserunt.</p>
            <button className='btn btn-primary rounded-full w-35'>Subscribe</button>
          </div>
        </div>

        <span className='text-2xl m-0'>Videos</span>
        <hr className='-mt-5'/>
        
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1'>

        
        {
                Array.from({length:50}).map((_, index) => (
                    <Link to={`/video/02/10`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500' 
                    onClick={()=>setSidebarOpen(false)}
                    key={index}>
                        <img className='w-[95%] rounded-xl' src={thumbnail} alt="" />
                        <div className='w-[95%]'>
                            <div className='flex justify-between '>
                                <h2 className='text-lg font-bold mt-2'>Title</h2>
                                <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                            </div>

                            <h3 className='text-md font-semibold text-base-content/60 hover:text-base-content cursor-pointer duration-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, aut.</h3>
                            <p className='text-sm font-semibold text-base-content/60'>
                                20 K views &bull;20 hours ago
                            </p>

                        </div>
                    </Link>

                ))

            }
      </div>

      </div>
    </>
  )
}

export default Profile
