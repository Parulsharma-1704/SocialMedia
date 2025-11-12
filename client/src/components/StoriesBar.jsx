import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/user';
import { IoIosAddCircle } from "react-icons/io";
import moment from 'moment';
import StoryModal from './StoryModal';
import StoryViewer from './StoryViewer';

const StoriesBar = () => {
    const [stories, setStories] = useState([]);
    const [showModal,setShowModal]=useState(false);
    const [viewStory,setViewStory]=useState(null);

    const fetchStories = async () => {
        setStories(dummyStoriesData);
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <div>
            <div className='flex gap-4 overflow-x-auto no-scrollbar'>
                {/* Add story card */}
                <div onClick={()=>(setShowModal(true))} className='h-35 min-w-25 border-3 border-dashed rounded-lg border-purple-300 flex flex-col items-center justify-center'>
                    <IoIosAddCircle className='text-3xl text-purple-600' />
                    <p className='text-sm'>Create Story</p>
                </div>
                {/* Story Cards */}
                {
                    stories.map((story, index) => (
                        <div key={index} onClick={()=>(setViewStory(story))} className='h-35 min-w-25 max-w-30 rounded-lg relative bg-gradient-to-b from-indigo-500
                    to-purple-600 hover:from-indigo-700 hover:to-purple-800 cursor-pointer shadow'>
                            <img src={story.user.profile_picture} alt='' className='h-8 w-8 rounded-full absolute top-3 left-3
                        z-10 ring  ring-gray-100 shadow object-cover'/>
                            <p className='absolute top-18 left-3 text-white text-sm truncate max-w-24'>{story.content}</p>
                            <p className='text-white absolute bottom-1 right-2 text-xs'>{moment(story.createdAt).fromNow()}</p>
                            {
                                story.media_type !== 'text' && (
                                    <div className='absolute overflow-hidden rounded-lg bg-black inset-0 '>
                                        {
                                            story.media_type === 'image' ?
                                                <img src={story.media_url} alt='' className='h-full w-full object-cover 
                                                hover:scale-110 opacity-70 hover:opacity-80'/> 
                                                : <video src={story.media_url} className='h-full w-full object-cover 
                                                hover:scale-110 opacity-70 hover:opacity-80'/>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }

            </div>
            {/* Add Story Modal */}
            {
                showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories}/>
            }
            {/* View story modal */}
            {
                viewStory && <StoryViewer  viewStory={viewStory} setViewStory={setViewStory}/>
            }
        </div>
    )
}

export default StoriesBar