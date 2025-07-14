import React from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
const YourVideo = () => {
  const videos = [...Array(12)].map((_, index) => ({
    id: index,
    title: `Sample Video Title ${index + 1}`,
    channel: 'Devplay Channel',
    views: `${(index + 1) * 2}K `,
    time: '2 days ',
    thumbnail: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg'
  }));

  return (
    <div className='w-full h-auto flex flex-col'>

      <div className='px-0 md:px-10 flex flex-col gap-3 md:flex-row md:justify-between md:items-center'>
        <h1 className='px-4 py-2 text-5xl font-semibold'>Your Videos</h1>

        <div className="dropdown px-4 py-1 mr-20">
          <label tabIndex={0} className="btn btn-outline bg-base-100 m-1">
            Sort By <i className="ri-arrow-down-s-line ml-1"></i>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><div >Newest</div></li>
            <li><div >Most Viewed</div></li>
            <li><div >Oldest</div></li>

          </ul>
        </div>
      </div>
      <div className="vids w-full min-h-screen mt-3">

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-3  '>

          {videos.map((video, indx) => (
            <div key={indx} className=" rounded-md p-2 flex items-center justify-center">
              <VideoCard {...video} />
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default YourVideo;
