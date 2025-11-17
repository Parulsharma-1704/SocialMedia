import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/user';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import moment from 'moment';
import UserProfile from '../components/userProfile';
import ProfileModal from '../components/ProfileModal';


const Profile = () => {
  const {profileId}=useParams();
  const [user,setUser]=useState(null);
  const [posts,setPosts]=useState([]);
  const [activeTab,setActiveTab]=useState('posts');
  const [showEdit,setShowEdit]=useState(false);

  const fetchUser=async ()=>{
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  }
  useEffect(()=>{
    fetchUser();
  },[]);

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 pl-15 pr-15 pt-8'>
      <div className='flex flex-col items-center'>
        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* Cover photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {
              user.cover_photo && <img src={user.cover_photo} alt='' className='w-full h-full object-cover'/>
            }
          </div>
          {/* User Info */}
          <UserProfile user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit}/>
        </div>
          {/* Tabs */}
          <div className='mt-6 flex flex-col items-center'>
            <div className='bg-white rounded-lg shadow flex gap-4'>
              {
                ["posts","media","likes"].map((tab,index)=>(
                  <button key={index} className={`flex items-center justify-center rounded-lg p-2 w-30 text-lg font-medium
                  ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`} 
                  onClick={()=>(setActiveTab(tab))}>
                    {
                      tab.charAt(0).toUpperCase()+tab.slice(1)
                    }
                  </button>
                ))
              }
            </div>
            {/* Posts */}
            {
              activeTab === 'posts' && (
                <div className='mt-6 flex flex-col items-center gap-6 w-220'>
                  {
                    posts.map((post)=>(
                      <PostCard key={post._id} post={post}/>
                    ))
                  }
                </div>
              )
            }
            {/* Media */}
            {activeTab === 'media' && (
              <div className='mt-6 flex p-5'>
                {
                  posts.filter((post)=>(post.image_urls.length>0)).map((post)=>(
                    <>
                    {post.image_urls.map((image,index)=>(
                      <Link target='_blank' to={image} key={index} className='relative'>
                        <img src={image} key={index} alt='' className='w-64 aspect-video object-cover'/>
                        <p className='absolute right-0 bottom-0 text-white p-1 px-3 opacity-0
                        hover:opacity-100 backdrop-blur-xl transition duration-300'>
                          Posted {moment(post.createdAt).fromNow()}</p>
                      </Link>
                    ))}
                    </>
                  ))
                }
              </div>
            )}
          </div>
      </div>
      {/* Edit profile modal*/}
      {showEdit && <ProfileModal setShowEdit={setShowEdit}/>}
    </div>
  ) : (
    <Loading/>
  )
}

export default Profile