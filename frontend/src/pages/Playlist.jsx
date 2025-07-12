import React from 'react'

const Playlist = () => {
    return (
        <div className='w-full h-auto flex flex-col'>
            <h1 className='px-4 py-2 text-5xl font-semibold'>Playlists</h1>

            <div className="dropdown px-4 py-1">
                <label tabIndex={0} className="btn btn-outline  bg-base-100 m-1">
                    A-Z<i className="ri-arrow-down-s-line"></i>
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><div >A-Z</div></li>
                    <li><div >Recently Added</div></li>

                </ul>
            </div>



            <div className="vids w-full min-h-screen mt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3">
                    {[...Array(20)].map((_, index) => (
                        <div key={index} className='flex items-center justify-center'>
  <div className="stack stack-top size-55 w-full">
    
    {/* First Card with Image */}
    <div className="border-base-content card bg-base-100 border text-center">
      <div className="card-body p-0 overflow-hidden">
        <img
          src="https://pressbooks.cuny.edu/app/uploads/sites/93/2022/08/thanuj-mathew-8CSTVoDMEXg-unsplash-scaled.jpg"
          alt="Playlist Cover"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>

    {/* Second Card */}
    <div className="border-base-content card bg-base-100 border text-center">
      <div className="card-body">B</div>
    </div>

    {/* Third Card */}
    <div className="border-base-content card bg-base-100 border text-center">
      <div className="card-body">C</div>
    </div>

  </div>
</div>

                    ))}
                </div>
            </div>



        </div>



    )
}

export default Playlist
