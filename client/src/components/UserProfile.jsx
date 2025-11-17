import React from 'react'
import { GoVerified } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import moment from 'moment';

const UserProfile = ({user,posts,profileId,setShowEdit}) => {
  return (
    <div className='relative'>
        <div>

            <div className='absolute left-8 -top-18'>
                <img src={user.profile_picture} alt='' className='h-35 w-35 rounded-full object-cover 
                 ring-white ring-4 shadow-lg z-2'/>
            </div>

            <div className='flex flex-col shadow-lg'>
                <div className='flex items-center justify-between w-full'>
                    <div className='ml-47'>
                        <div className='flex gap-2 items-center mt-4'>
                            <h1 className='text-2xl font-semibold'>{user.full_name}</h1>
                            <GoVerified  className='w-6 h-6 text-blue-500 font-medium'/>
                        </div>
                        <p className='text-gray-600'>{user.username ? `@${user.username}` : 'Add a username'}</p>
                    </div>
                    {/* If user is not on others profile that means he is opening his profile so we will give edit button */}
                    {!profileId && 
                        <button onClick={()=>(setShowEdit(true))} className='border border-slate-300 p-1.5 flex
                        items-center justify-center rounded gap-1.5 mr-10 cursor-pointer'>
                            <FaRegEdit className='w-4 h-4'/>
                            Edit
                        </button>
                    }
                </div>
                <p className='text-md text-gray-700 mt-4 ml-47'>{user.bio}</p>

                <div className='flex  gap-5 ml-47 mt-3 mb-6'>
                    <span className='flex items-center text-slate-600 text-sm font-medium gap-1.5'>
                        <FiMapPin className='w-4 h-4'/>
                        {
                            user.location ? user.location : 'Add location'
                        }
                    </span>
                    <span className='flex items-center text-slate-600 text-sm font-medium gap-1.5'>
                        <SlCalender className='w-4 h-4'/>
                        Joined <span className='font-medium'>{moment(user.createdAt).fromNow()}</span>
                    </span>
                </div>

                <div className='flex ml-47 gap-6 mb-4'>
                        <div className='flex gap-1 items-end'>
                            <span className='text-2xl font-medium'>{posts.length}</span>
                            <span className='text-slate-400 font-semibold'>Posts</span>
                        </div>
                        <div className='flex gap-1 items-end'>
                            <span className='text-2xl font-medium'>{user.followers.length}</span>
                            <span className='text-slate-400 font-semibold'>Followers</span>
                        </div>
                        <div className='flex gap-1 items-end'>
                            <span className='text-2xl font-medium'>{user.following.length}</span>
                            <span className='text-slate-400 font-semibold'>Following</span>
                        </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default UserProfile