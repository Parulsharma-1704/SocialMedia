import React from 'react'
import { dummyUserData } from '../assets/user'

const UserCard = ({user}) => {
    const currentUser=dummyUserData;

    const handleFollow=async()=>{

    }

    const handleConnectionRequest=async()=>{

    }

  return (
    <div key={user._id} className='bg-white rounded shadow'>
        <div className='flex flex-col gap-4 items-center justify-center'>
            <img src={user.profile_picture} alt=''/>
            <p>{user.full_name}</p>
            {user.username && <p>@{user.username}</p>}
            {user.bio && <p>{user.bio}</p>}
        </div>
    </div>
  )
}

export default UserCard