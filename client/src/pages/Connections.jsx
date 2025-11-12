import React, { useState } from 'react'
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { LuUserRoundPen } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { Navigate, useNavigate } from 'react-router-dom';

import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections
} from '../assets/user';


const Connections = () => {
  const [currentTab,setCurrentTab]=useState('Followers');
  const navigate = useNavigate();
  const dataArray = [
    { label: 'Followers', value: followers, icons: <FiUsers /> },
    { label: 'Following', value: following, icons: <FiUserCheck /> },
    { label: 'Pending', value: pendingConnections, icons: <LuUserRoundPen /> },
    { label: 'Connections', value: connections, icons: <FiUserPlus /> },
  ]

  return (
    <div className='h-screen bg-slate-50 p-10'>
      <div className='flex flex-col gap-4'>
        {/* Title */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-medium'>Connections</h1>
          <p className='text-lg text-slate-600'>Manage your network and discover new connections</p>
        </div>

        {/* Counts */}
        <div className='flex gap-5'>
          {
            dataArray.map((data,index)=>(
              <div key={index} className='bg-white rounded-lg shadow w-40 p-4 flex flex-col justify-center items-center'>
                <b className='text-lg'>{data.value.length}</b>
                <p className='text-slate-600'>{data.label}</p>
              </div>
            ))
          }
        </div>

        {/* Tabs */}
        <div className='bg-white p-3 rounded-lg shadow flex  gap-10 w-150 justify-center'>
          {
            dataArray.map((item,index)=>(
              <button key={index} onClick={()=>(setCurrentTab(item.label))} className={`flex  items-center gap-2
              ${currentTab === item.label ? 'bg-white font-medium text-black' : 'text-gray-500 hover:text-black'}`}>
                  {item.icons}
                  <span>{item.label}</span>
                  {item.count!==undefined && (
                    <span>{item.count}</span>
                  )}
                  </button>
            ))
          }
        </div>

        {/* Connections */}
        <div className='flex gap-8 mt-4'>
          {
            dataArray.find((item)=>(item.label===currentTab)).value.map((user,index)=>(
              <div key={index} className='bg-white p-3 rounded-lg shadow flex  gap-4'>
                <img src={user.profile_picture} alt='' className='rounded-full w-12 h-12 shadow-md' />
                <div>
                  <p className='font-medium text-slate-700'>{user.full_name}</p>
                  <p className='text-slate-500'>@{user.username}</p>
                  <p className='text-sm text-slate-600'>{user.bio.slice(0,30)}...</p>
                  <div className='flex gap-4 mt-4'>
                    {
                      <button onClick={()=>(navigate(`/profile/${user._id}`))}
                       className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-md p-1.5 rounded-lg w-30'>
                        View Profile</button>
                    }
                    {
                      currentTab === 'Following' && (
                        <button className='bg-slate-200 rounded-lg p-1.5 w-30'>Unfollow</button>
                      )
                    }
                    {
                      currentTab === 'Pending' && (
                        <button className='bg-slate-200 rounded-lg p-1.5 w-30'>Accept</button>
                      )
                    }
                    {
                      currentTab === 'Connections' && (
                        <button onClick={()=>(navigate(`/messages/${user._id}`))}
                         className='bg-slate-200 rounded-lg p-1.5 flex gap-1 items-center w-30 justify-center'>
                          <FiMessageSquare className='w-4 h-4'/>Message</button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Connections