import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/user';
import { IoIosSearch } from "react-icons/io";
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const Discover = () => {
  const [input,setInput]=useState('');
  const [users,setUsers]=useState(dummyConnectionsData);
  const [loading,setLoading]=useState(false);

  const handleSearch=async(e)=>{
    if(e.key==='Enter'){
      setUsers([]);
      setLoading(true);
      setTimeout(()=>{
        setUsers(dummyConnectionsData);
        setLoading(false);
      },1000);
    }
  }

  return (
    <div className='h-screen bg-slate-50 p-10'>
      <div className='flex flex-col gap-5'>
         {/* Title */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-medium'>Discover People</h1>
          <p className='text-lg text-slate-600'>Connect with amazing people and grow your network</p>
        </div>

        {/* Search */}
        <div className='bg-white rounded-lg shadow p-3'>
          <div className='p-6'>
            <div className='relative flex items-center gap-3 border-2 rounded p-1 border-slate-200'>
              <IoIosSearch size={18}/>
              <input type='text' placeholder='Search people by name, username, bio, or location...'
              onChange={(e)=>(setInput(e.target.value))} value={input} onKeyUp={handleSearch} 
              className='w-full placeholder:text-slate-500 focus:outline-none'/>
            </div>
          </div>
        </div>

        <div>
          {
            users.map((item,index)=>{
              <UserCard user={item} key={item._id}/>
            })
          }
        </div>
        {
          loading && (<Loading height='60vh'/>)
        }

      </div>
    </div>
  )
}

export default Discover