import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/user';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import sponser from '../assets/sponser.jpg';
import RecentMessages from '../components/RecentMessages';

const Feed = () => {
  const [feeds,setFeeds]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchFeeds=async ()=>{
    setFeeds(dummyPostsData);
  }

  useEffect(()=>{
    fetchFeeds();
    setLoading(false);
  },[])

  return !loading ? (
    <div className='p-10 h-full relative flex '>
      {/* Stories and post list */}
      <div className='flex flex-col gap-10 w-[55vw] p-4 overflow-y-auto no-scrollbar'>
        <StoriesBar/>
        <div className='flex flex-col gap-5'>
          {
            feeds.map((post,index)=>(
              <PostCard key={index} post={post}/>
            ))
          }
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='absolute right-4 top-4 w-[22vw] flex flex-col gap-4 overflow-y-auto no-scrollbar h-screen'>
        <div className='bg-white p-3 rounded shadow'>
          <h3 className='text-slate-800 font-semibold mt-2'>Sponsored</h3>
          <img src={sponser} className='w-75 h-50 rounded-md mt-2' alt=''/>
          <p className='text-slate-600 mt-2'>Email marketing</p>
          <p className='text-slate-400 mt-2'>Supercharge your marketing with a powerful, easy-to-use platform built for results</p>
        </div>
        <RecentMessages/>
      </div>
    </div>
  ) : (
    <Loading/>
  )
}

export default Feed