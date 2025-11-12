import React from 'react'
import { dummyConnectionsData } from '../assets/user'
import { TiMessage } from "react-icons/ti";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate=useNavigate();

  return (
    <div className='h-screen relative bg-slate-50 pl-10'>
      <div className='p-5'>
        {/* Title */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-medium'>Messages</h1>
          <p className='text-lg text-slate-600'>Talk to your friends and family</p>
        </div>

        {/* Connected Users */}
        <div className='flex flex-col gap-5 mt-7 w-200'>
          {
            dummyConnectionsData.map((user,index)=>(
              <div key={index} className='bg-white shadow rounded-lg p-5 flex items-center gap-5'>
                  <img src={user.profile_picture} alt='' className='rounded-full size-12 object-cover'/>
                  <div className=' font-semibold'>
                    <p className='text-slate-700'>{user.full_name}</p>
                    <p className='text-slate-500'>@{user.username}</p>
                    <p className='text-slate-500 text-sm'>{user.bio}</p>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <button className='bg-slate-100 p-2 rounded hover:bg-slate-300'
                     onClick={()=>(navigate(`/messages/${user._id}`))}>
                        <TiMessage className='text-slate-600 text-lg hover:scale-125'/>
                    </button>
                    <button className='bg-slate-100 p-2 rounded hover:bg-slate-300' 
                    onClick={()=>(navigate(`/profile/${user._id}`))}>
                        <FaRegEye className='text-slate-600 text-lg hover:scale-125'/>
                    </button>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Messages