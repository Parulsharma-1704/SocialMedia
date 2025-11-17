import React from 'react'
import { dummyUserData } from '../assets/user'
import { FiMapPin } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

const UserCard = ({user}) => {
    const currentUser=dummyUserData;

    const handleFollow=async()=>{

    }

    const handleConnectionRequest=async()=>{

    }

  return (
    <div key={user._id} className='bg-white rounded shadow p-4'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <img src={user.profile_picture} alt='' className='w-15 h-15 rounded-full object-cover '/>
            <p className='text-lg  font-medium'>{user.full_name}</p>
            {user.username && <p className='text-slate-600 text-sm'>@{user.username}</p>}
            {user.bio && <p className='text-slate-700'>{user.bio}</p>}
        </div>

        <div className='flex gap-5 mt-3 items-center justify-center'>
          <div className='flex items-center gap-1 text-slate-600 text-sm pr-2 pt-1 pb-1 pl-2 
          rounded-2xl border-slate-400 border'>
            <FiMapPin size={12} className='text-slate-600'/>{user.location}
          </div>
          <div className='flex items-center gap-1 text-slate-600 text-sm pr-2 pt-1 pb-1 pl-2 
          rounded-2xl border-slate-400 border'>
            <span>{user.followers.length}</span>Followers
          </div>
        </div>

        <div className='w-full mt-4 flex gap-2'>
          {/* Follow button */}
          <button disabled={currentUser?.following.includes(user._id)} onClick={handleFollow} className='flex items-center
          gap-2 text-white text-lg bg-gradient-to-r from-indigo-600 to-purple-600 rounded w-full justify-center
           hover:from-indigo-700 hover:to-purple-700'>
            <FiUserPlus className='w-4 h-4' /> {currentUser?.following.includes(user._id) ? 'Following': 'Follow'}
          </button>

          {/* Connection request button / message button */}
          <button onClick={handleConnectionRequest} className='border border-slate-400 p-1 text-slate-500 rounded'>
            {
              currentUser?.connections.includes(user._id) ? 
              <FiMessageCircle  className='w-5 h-5 hover:scale-105 transition'/> 
              :
              <GoPlus className='w-5 h-5 hover:scale-115 transition'/>
            }
          </button>
        </div>
    </div>
  )
}

export default UserCard