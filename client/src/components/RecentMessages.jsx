import React, { useState, useEffect } from 'react'
import { dummyRecentMessagesData } from '../assets/user';
import { Link } from 'react-router-dom';
import moment from 'moment';

const RecentMessages = () => {
    const [messages, setMessages] = useState([]);

    const fetchRecentMessages = async () => {
        setMessages(dummyRecentMessagesData);
    }

    useEffect(() => {
        fetchRecentMessages();
    }, []);

    return (
        <div className='bg-white rounded p-3 shadow'>
            <h3 className='text-slate-8 font-semibold mt-3'>Recent Messages</h3>
            <div className='flex flex-col gap-2.5 mt-4'>
                {
                    messages.map((msg, index) => (
                        <Link key={index} to={`/messages/${msg.from_user_id._id}`} className='hover:bg-slate-200 p-1 rounded flex gap-4 items-center'>
                            <img src={msg.from_user_id.profile_picture} alt='' className='w-8 h-8 rounded-full object-cover' />
                            <div className='w-full'>
                                <div className='flex justify-between'>
                                    <p className='font-medium'>{msg.from_user_id.full_name}</p>
                                    <p className='text-[10px] text-slate-400'>{moment(msg.createdAt).fromNow()}</p>
                                </div>
                                <div className='flex justify-between '>
                                    <p className='text-gray-500'>{msg.text ? msg.text : 'media'}</p>
                                    {
                                        !msg.seen && <p className='bg-indigo-500 text-white w-4 h-4 rounded-full
                                        text-[10px] flex justify-center items-center'>1</p>
                                    }
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentMessages