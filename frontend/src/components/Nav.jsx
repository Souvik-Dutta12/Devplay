import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="w-[100vw] md:w-screen  absolute z-100 px-10 py-7 navbar bg-base-100 flex flex-col md:flex-row gap-4 md:gap-0">
            <div className="flex-1">
                <Link to={'/'} className=" text-2xl font-bold ml-2 md:ml-7">Devplay</Link>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/2">
                <input type="text" placeholder="Search" className="input input-bordered w-full bg-base-300 md:w-2/3 text-lg " />

                
                <div className="dropdown dropdown-hover hidden md:flex">
                    <label tabIndex={0} className="btn rounded-full bg-base-300">
                        <i className="ri-add-line mr-1"></i> Create
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                        <li><a href="/upload">Upload Video</a></li>
                        <li><a href="/live">Go Live</a></li>
                        <li><a href="/shorts">Create Short</a></li>
                    </ul>
                </div>

                <span className='btn ml-5 px-4 py-3 btn-outline btn-primary duration-300 hidden md:flex'>Log out</span>
            </div>
        </div>
    )
}

export default Nav
