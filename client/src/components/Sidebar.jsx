import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import MenuItems from './MenuItems'
import { Link, useNavigate } from 'react-router-dom'
import { IoAddCircleOutline } from "react-icons/io5";
import {UserButton,useClerk} from '@clerk/clerk-react'
import { dummyUserData } from '../assets/user';
import { CiLogout } from "react-icons/ci";

const Sidebar = ({isSidebarOpen,setSidebarOpen}) => {
  const navigate=useNavigate();
  const user=dummyUserData;
  const {signOut}=useClerk();
  return (
    <div className='w-60 p-2 relative'>
        <div className='p-1 flex justify-center shadow'>
          <img src={logo} alt='logo' onClick={()=>(navigate('/'))} className='w-35 h-12'/>
        </div>
        <MenuItems setSidebarOpen={setSidebarOpen}/>
        <Link to='/create-post' className='flex gap-1 items-center justify-center p-1 w-52 text-lg
         text-white rounded-lg bg-purple-600 hover:bg-purple-800 '>
            <IoAddCircleOutline />
            <p>Create Post</p>
        </Link>
        <div className='absolute bottom-0 left-0 border-t-1 border-gray-300 w-full p-1.5'>
          <div className='flex  items-center gap-2 relative'>
              <UserButton/>
              <div>
                <h1 className='font-semibold'>{user.full_name}</h1>
                <p className='text-sm'>@{user.username}</p>
              </div>
              <CiLogout onClick={signOut} className='absolute right-0 text-lg'/>
          </div>
        </div>
    </div>
  )
}

export default Sidebar