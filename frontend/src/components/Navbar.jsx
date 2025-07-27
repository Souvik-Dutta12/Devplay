import React from 'react'
import logo from "/devplayLogo.png"
import { Link } from 'react-router-dom'

const Navbar = ({setSidebarOpen}) => {
    return (
        <div className='flex w-[100vw] items-center px-5 py-3 shadow-xl justify-between bg-base-300 sticky top-0 z-10'>
            <div className='left flex items-center'>
                <i onClick={()=>setSidebarOpen(prev=>!prev)} className="ri-menu-2-line text-xl font-bold mr-[25px] cursor-pointer"></i>
                <Link to="/" className='flex items-center text-xl ml-0 md:ml-5 cursor-pointer'>
                    <img className='w-10' src={logo} alt='logo' />
                    <p className='font-bold'> Devplay</p>
                </Link>
            </div>

            <div className='midle flex items-center'>
                <div className=' items-center border rounded-full w-[550px] py-2 hidden md:flex'>

                    <input className='w-full outline-none bg-transparent px-4' type="text" placeholder='Search' />
                    <i className="ri-search-eye-line text-xl mr-5 cursor-pointer "></i>
                </div>
            </div>

            <div className='right flex items-center text-xl mr-0 md:mr-5 gap-8'>
                <div className='flex items-center gap-4  bg-base-100 px-3 py-2 rounded-full cursor-pointer '>
                    <i className="ri-add-fill "></i>
                    <h1 className='text-lg'>Create</h1>
                </div>
                <i className="ri-apps-2-fill cursor-pointer hidden md:flex"></i>
                <i className="ri-notification-4-line cursor-pointer hidden md:flex"></i>
                <i className="ri-user-line cursor-pointer rounded-full bg-base-100 px-3 py-2"></i>
            </div>
        </div>
    )
}

export default Navbar
