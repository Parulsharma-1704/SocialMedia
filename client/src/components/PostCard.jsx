import React, { useState } from 'react'
import { HiOutlineCheckBadge } from "react-icons/hi2";
import moment from 'moment';
import { CiHeart } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { dummyUserData } from '../assets/user';
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {
    const [likes,setLikes]=useState(post.likes_count);
    const currentUser=dummyUserData;
    const navigate=useNavigate();

    const postWithHashtags=post.content.replace(/(#\w+)/g,'<span class="text-indigo-600">$1</span>');

    const handleLike= async()=>{

    }

  return (
    <div  className='bg-white rounded-lg p-4 shadow flex flex-col gap-5'>
        {/* User info */}
        <div onClick={()=>(navigate(`/profile/${post.user._id}`))} className='flex items-center gap-3 cursor-pointer'>
            <img src={post.user.profile_picture} alt='' className='w-10 h-10 rounded-full shadow'/>
            <div>
                <div className='flex items-center gap-1'>
                    <span>{post.user.full_name}</span>
                    <HiOutlineCheckBadge className='w-4 h-4 text-blue-500'/>
                </div>
                <div className='text-gray-500 text-sm'>
                    @{post.user.username} . {moment(post.createdAt).fromNow()}
                </div>
            </div>
        </div>
        {/* Content */}
        {
            post.content && <div className='text-gray-800 text-sm whitespace-pre-line'
             dangerouslySetInnerHTML={{__html: postWithHashtags}}/>
        }
        {/* Images */}
        <div className='grid grid-cols-2 gap-2'>
            {
                post.image_urls.map((img,index)=>(
                    <img src={img} alt='' key={index} className={`w-full h-48 object-cover
                        rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`}/>
                ))
            }
        </div>
        {/* Actions */}
        <div className='flex items-center gap-4 text-gray-400 temt-sm border-t border-gray-300 pt-3'>
            <div className='flex gap-1 items-center'>
                <CiHeart  className={`w-5 h-5 cursor-pointer text-lg 
                ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike}/>
                <span>{likes.length}</span>
            </div>
            <div className='flex gap-1 items-center'>
                <FiMessageCircle className={`w-5 h-5 cursor-pointer text-lg`}/>
                <span>{12}</span>
            </div>
            <div className='flex gap-1 items-center'>
                <IoShareSocialOutline className={`w-5 h-5 cursor-pointer text-lg`}/>
                <span>{7}</span>
            </div>
        </div>
    </div>
  )
}

export default PostCard