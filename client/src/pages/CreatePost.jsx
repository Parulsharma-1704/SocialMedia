import React, { useState } from 'react'
import { dummyUserData } from '../assets/user';
import { IoClose } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [content,setContent]=useState('');
  const [images,setImages]=useState([]);
  const [loading,setLoading]=useState(false);

  const user=dummyUserData;

  const handleSubmit=async ()=>{

  };
  
  return (
    <div className='h-screen p-10'>
      <div>
        {/* Title */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Create Post</h1>
          <p className='text-slate-700 text-xl'>Share your thoughts with the world</p>
        </div>
        {/* Form */}
        <div className='bg-white p-5 rounded-xl shadow-md mt-10 w-xl'>

          {/* Header */}
          <div className='flex gap-4 items-center'>
            <img src={user.profile_picture} alt='' className='w-12 h-12 rounded-full shadow object-cover'/>
            <div>
              <h2 className='font-semibold text-xl'>{user.full_name}</h2>
              <p className='text-sm text-gray-600'>@{user.username}</p>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <textarea placeholder="What's happening?" onChange={(e)=>(setContent(e.target.value))} value={content}
              className='w-full resize-none outline-none h-20 mt-4 p-2 text-sm placeholder:text-gray-400'/>
          </div>
          {/* Images */}
          {
            images.length > 0 && <div className='flex flex-wrap gap-2 mt-4'>
              {
                images.map((img,i)=>(
                  <div key={i} className='relative group'>
                    <img src={URL.createObjectURL(img)} className='h-20 rounded-md w-25 object-cover'/>
                    <div onClick={()=>(setImages(images.filter((_,index)=>(index!==i))))} 
                    className='absolute hidden group-hover:flex justify-center items-center
                    top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'>
                      <IoClose className='w-6 h-6 text-white' />
                    </div>
                  </div>
                ))
              }
            </div>
          }
          {/* Bottom bar */}
          <div className='flex items-center justify-between pt-3 border-t border-gray-300 mt-3'>
            <label htmlFor='images' className='flex items-center gap-2 text-sm
             text-gray-500 hover:text-gray-700 transition cursor-pointer'>
              <CiImageOn className='size-9'/>
             </label>
             <input type='file' id="images" accept='image/*' 
             hidden multiple onChange={(e)=>setImages([...images, ...e.target.files])}/>

             <button disabled={loading} className=' bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700 text-white text-xl font-medium px-8 py-2 
              rounded-md cursor-pointer' onClick={()=>(toast.promise(
                handleSubmit,
                {
                  loading: 'uploading...',
                  success: <p>Post Added</p>,
                  error: <p>Post Not Added</p>,
                }
              ))}>Publish Post</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePost