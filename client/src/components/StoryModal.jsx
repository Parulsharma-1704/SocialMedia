import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { LuText } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuSparkle } from "react-icons/lu";

const StoryModal = ({setShowModal,fetchStories}) => {
    const bgColors=["red","yellow","green","blue","pink","purple"];
    
    const [mode,setMode]=useState('text');
    const [background,setBackground]=useState(bgColors[0]);
    const [text,setText]=useState("");
    const [media,setMedia]=useState(null);
    const [previewUrl,setPreviewUrl]=useState(null);

    const handleMediaUpload=(e)=>{
        const file=e.target.files?.[0];
        if(file){
            setMedia(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleCreateStory=async ()=>{

    }

  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 text-white flex justify-center items-center backdrop-blur'>
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='flex items-center justify-center gap-40'>
                <button onClick={()=>(setShowModal(false))} className='cursor-pointer'>
                    <FaArrowLeft />
                </button>
                <h2 className='text-lg font-sans'>Create Story</h2>
                <span className='w-10'></span>
            </div>
            <div className='h-96 w-120 rounded-lg p-5' style={{backgroundColor: background}}>
                {mode==="text" && (
                    <textarea className='text-white placeholder:text-white h-full w-full'
                     placeholder="What's on your mind?" onChange={(e)=>(setText(e.target.value))} value={text}/>
                )}
                {
                    mode === "media" && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="" className='object-contain max-h-full'/>) : 
                            (<video src={previewUrl} className='object-contain max-h-full'/>)
                    )
                }

            </div>

            <div className='flex justify-start gap-1.5'>
                {
                    bgColors.map((bg,index)=>(
                        <button key={index} className='w-6 h-6 rounded-full ring 
                        cursor-pointer' style={{backgroundColor: bg}} onClick={()=>(setBackground(bg))}></button>
                    ))
                }
            </div>
                <div className='flex gap-2'>
                    <button onClick={()=>{setMode('text'); setMedia(null); setPreviewUrl(null)}} className={`flex items-center
                     justify-center gap-2 p-2 rounded cursor-pointer ${mode=== "text" ?  "bg-white text-black" : "bg-zinc-800"}`}>
                        <LuText size={18}/>Text
                    </button>
                    <label className={`flex items-center justify-center gap-2 p-2 
                        rounded cursor-pointer ${mode === "media" ? "bg-white text-black" : "bg-zinc-800"}`}>
                        <input onChange={(e)=>{handleMediaUpload(e); setMode("media")}} type='file' 
                        accept='image/*,video/*' className='hidden'/>
                        <MdOutlineFileUpload size={18}/> Photo/Video
                    </label>
                </div>
            <button onClick={()=> (toast.promise(handleCreateStory(),{
                loading: 'Saving...',
                success: <p>Story Added</p>,
                error: (e)=>(<p>{e.message}</p>),
            }))} className='flex items-center gap-2 bg-gradient-to-r from-indigo-800 to-purple-800 p-2
            cursor-pointer rounded-lg'>
                <LuSparkle size={18}/> Create Story
            </button>
        </div>
    </div>
  )
}

export default StoryModal