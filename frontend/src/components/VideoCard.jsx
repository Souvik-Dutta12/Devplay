import React from 'react'

const VideoCard = ({ thumbnail, title, channel, views, time }) => {
  return (
    <div className="w-full sm:w-[320px] min-h-72 flex flex-col cursor-pointer transition-transform hover:scale-[1.02] ">
      <div className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt="video thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-3 mt-3">
        {/* Replace with channel avatar if needed */}
        <div className="w-9 h-9 bg-gray-400 rounded-full shrink-0"></div>

        <div className="flex flex-col text-sm">
          <h3 className="font-semibold text-base text-white line-clamp-2">
            {title}
          </h3>
          <span className="text-gray-400">{channel}</span>
          <span className="text-gray-500 text-xs">
            {views} views • {time} ago
          </span>
        </div>
      </div>
    </div>
  );
};


export default VideoCard
