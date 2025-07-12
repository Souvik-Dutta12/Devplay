import React from 'react'

const Sidebar = () => {
    return (

<div class="flex h-screen bg-base-100 text-base-content">

  <div class="w-64 bg-[#3B2F2F] text-white fixed left-0 top-0 h-screen shadow-lg z-50 p-4">
    <h1 class="text-2xl font-bold mb-6">Devplay</h1>
    <ul class="space-y-4">
      <li><a href="#" class="hover:text-yellow-400">Dashboard</a></li>
      <li><a href="#" class="hover:text-yellow-400">History</a></li>
      <li><a href="#" class="hover:text-yellow-400">Jobs</a></li>
      <li><a href="#" class="hover:text-yellow-400">Profile</a></li>
      <li><a href="#" class="hover:text-yellow-400">Logout</a></li>
    </ul>
  </div>


  <div class="ml-64 w-full p-6 overflow-y-auto">
    <h2 class="text-3xl font-semibold">Main Content</h2>
    <p class="mt-4">
      Welcome to Devplay. Scroll to test the fixed sidebar. This section will scroll while the sidebar remains visible.
    </p>

    <div class="h-[2000px] mt-10 bg-base-200 rounded-md p-6">
      <p>Scroll down to see the fixed sidebar effect in action.</p>
    </div>
  </div>
</div>


    )
}

export default Sidebar
