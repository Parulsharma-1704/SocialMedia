import React, { useEffect, useState } from 'react'
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const StoryViewer = ({viewStory,setViewStory}) => {
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        let timer,progressInterval;

        if(viewStory && viewStory.media_type!=='video'){
            setProgress(0);
            const duration=10000;
            const setTime=100;
            let elapsed=0;

            progressInterval=setInterval(()=>{
                elapsed+=setTime;
                setProgress((elapsed/duration)*100);
            },setTime);

            //close story after 10s
            timer=setTimeout(()=>{
                setViewStory(null);
            },duration);
        }
        return ()=>{
            clearTimeout(timer);
            clearInterval(progressInterval);
        }
    },[viewStory,setViewStory]);

    const handleClose=()=>{
        setViewStory(null);
    }

    if(!viewStory){
        return null;
    }

    const renderContent=()=>{
        switch (viewStory.media_type) {
            case "image":
                return(
                    <img src={viewStory.media_url} alt='' className='w-full h-screen object-contain'/>
                );
                case "video":
                return(
                    <video src={viewStory.media_url} onEnded={()=>(setViewStory(null))} 
                    className='w-full h-screen object-contain' controls autoPlay/>
                );
                case "text":
                return(
                    <div className='w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>
                        {viewStory.content}
                    </div>
                );
            default:
                return null;
        }
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-90 h-screen z-110 ' 
    style={{backgroundColor: viewStory.media_type === "text" ? viewStory.background_color : '#000000'}}>

        {/* Progress Bar */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>
            <div className='h-full bg-white ' style={{width: `${progress}%`}}>
            </div>
        </div>
        {/* User Info- top left */}
        <div className='absolute top-5 left-5 flex justify-center items-center bg-gray-900 rounded p-2 gap-3 text-white'>
            <img src={viewStory.user?.profile_picture} alt='' className='h-8 w-8 rounded-full ring ring-white object-cover'/>
            <div className='flex gap-2 items-center'>
                <span>{viewStory.user?.full_name}</span>
                <HiOutlineCheckBadge size={18} />
            </div>
        </div>
        {/* Close button */}
        <button className='absolute top-4 right-4 text-white text-3xl' onClick={handleClose}>
            <IoClose  className='w-8 h-8 cursor-pointer hover:scale-110'/>
        </button>

        {/* Content wrapper */}
        <div className='flex justify-center items-center w-[90vw] h-[90vh]'>
            {renderContent()}
        </div>
    </div>
  )
}

export default StoryViewer