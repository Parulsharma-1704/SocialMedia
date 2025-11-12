import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { IoMdClose , IoMdMenu } from "react-icons/io";
import { dummyUserData } from '../assets/user.jsx';
import Loading from '../components/Loading';


const Layout = () => {
  const user=dummyUserData;
  const [isSidebarOpen,setSidebarOpen]=useState(false);

  return user ? (
    <div className='w-full flex h-screen overflow-hidden'>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div className='flex-1 bg-slate-50'>
          <Outlet/>
      </div>
      {
        isSidebarOpen ? <IoMdClose onClick={()=>(setSidebarOpen(false))}/> : <IoMdMenu onClick={()=>(setSidebarOpen(true))} />
      }
    </div>
  ) : (
    <>
      <Loading/>
    </>
  )
}

export default Layout