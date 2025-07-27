import React from 'react'
import thumnail from '/thumbnil.jpeg'
const Recomended = () => {
  return (
    <div className='w-full md:w-1/3 flex flex-col gap-1'>
      {Array(10).fill().map((_, index) => (
        <div className="flex justify-between mb-2 gap-3 cursor-pointer" key={index}>
          <img className='w-2/5 h-25 md:h-30 rounded-xl' src={thumnail} alt="" />
          <div className=' flex flex-col '>
            <div className='flex items-center justify-between'>
              <h4 className='text-md font-bold'>Lorem ipsum dolor  adipisicing elit. Iure, esse?</h4>
              <i className="ri-more-2-line text-md font-bold cursor-pointer"></i>
            </div>
            <p className='text-sm text-base-content/60 '>Souvik Dutta</p>
            <p className='text-sm text-base-content/60'>199K Views &bull; 20 hours ago</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Recomended
