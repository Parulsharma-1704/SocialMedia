import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/user'
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";

const ChatBox = () => {

  const messages=dummyMessagesData
  const[text,setText]=useState('');
  const [image,setImage]=useState(null);
  const [user,setUser]=useState(dummyUserData);
  const messagesEndRef=useRef();

  const sendMessage=async ()=>{

  }

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages]);

  return user && (
    <div className='flex flex-col h-screen relative'>
      <div className='flex items-center gap-2 bg-gray-100 h-16 shadow p-2 px-14'>
        <img src={user.profile_picture} alt='' className='size-8 rounded-full object-cover'/>
        <div>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 -mt-0.5'>@{user.username}</p>
        </div>
      </div>
      <div>
        <div className='px-14 p-2 mt-4 flex flex-col gap-5'>
          {
            messages.toSorted((a,b)=>(new Date(a.createdAt)-new Date(b.createdAt))).map((msg,index)=>(
              <div key={index} className={`flex flex-col ${msg.to_user_id !== user._id ? 'items-start' : 'items-end'}`}>
                <div className={`p-2 text-sm w-sm bg-white text-slate-700 rounded-lg shadow
                   ${msg.to_user_id !== user._id ? 'rounded-bl-none' : 'rouned-br-none'}`}>
                  {msg.message_type === 'image' && <img src={msg.media_url} alt='' 
                  className='w-full rounded-lg max-w-sm mb-1'/>}
                  <p>{msg.text}</p>
                </div>

              </div>
            ))
          }
          <div ref={messagesEndRef}/>
        </div>
      </div>

      <div className='w-full flex items-center justify-center absolute bottom-6'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl border
         border-gray-200 shadow rounded-2xl'>
          <input type='text' placeholder='Type a message...' className='flex-1 outline-none text-slate-700'
          onKeyDown={(e)=>(e.key === 'Enter' && sendMessage())} onChange={(e)=>(setText(e.target.value))} value={text}/>

          <label type='file' id='image'>
            {
              image ? <img src={URL.createObjectURL(image)} className='h-8 rounded w-15 object-cover' alt=''/> 
              : <CiImageOn className='size-7 text-gray-500 cursor-pointer'/>
            }
            <input type='file' id='image' accept='image/*' hidden onChange={(e)=>(setImage(e.target.files[0]))}/>
          </label>
          <button onClick={sendMessage} className='bg-gradient-to-br from-indigo-500 to-purple-600 
          hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer
           text-white p-2 rounded-full'>
            <IoMdSend size={18}/>
          </button>
        </div>       

      </div>

    </div>
  )
}

export default ChatBox