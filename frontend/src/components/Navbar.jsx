import React from 'react'
import logo from "/devplayLogo.png"

const Navbar = () => {
    return (
        <div className='flex items-center px-5 py-3 shadow-xl justify-between bg-base-300 sticky top-0 z-10'>
            <div className='left flex items-center'>
                <i className="ri-menu-2-line text-xl font-bold mr-[25px] cursor-pointer"></i>
                <h1 className='flex items-center text-xl ml-5 cursor-pointer'>
                    <img className='w-10' src={logo} alt='logo' />
                    <p className='font-bold'> Devplay</p>
                </h1>
            </div>

            <div className='midle flex items-center'>
                <div className='flex items-center border rounded-full w-[550px] py-2'>

                    <input className='w-full outline-none bg-transparent px-4' type="text" placeholder='Search' />
                    <i className="ri-search-eye-line text-xl mr-5 cursor-pointer "></i>
                </div>
            </div>

            <div className='right flex items-center text-xl mr-5 gap-8'>
                <div className='flex items-center gap-4  bg-base-100 px-3 py-2 rounded-full cursor-pointer '>
                    <i className="ri-add-fill "></i>
                    <h1 className='text-lg'>Create</h1>
                </div>
                <i className="ri-apps-2-fill cursor-pointer"></i>
                <i className="ri-notification-4-line cursor-pointer"></i>
                <i className="ri-user-line cursor-pointer rounded-full bg-base-100 px-3 py-2"></i>
            </div>
        </div>
    )
}

export default Navbar
