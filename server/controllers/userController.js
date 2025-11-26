import Connection from "../models/connection.js";
import imagekit from "../configs/imageKit.js";
import user from "../models/user.js";
import fs from 'fs';
import { connect } from "http2";

//Get user data using userId
export const getUserData=async (req,res)=>{
    try{
        const { userId }=req.auth();
        const User =await user.findById(userId);
        if(!User){
            return res.json({success: false,message: "user not found"});
        }
        res.json({success: true,user});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//update user data
export const updateUserData=async (req,res)=>{
    try{
        const { userId }=req.auth();
        let {username,bio,location,full_name}=req.body;
        const tempUser=await user.findById(userId);

        !username && (username = tempUser.username)

        if(tempUser.username !== username){
            const User=await user.findOne({username})
            if(User){
                //we will not change the username if it is already taken
                username=tempUser.username;
            }
        }
        
        const updatedData={
            username,
            bio,
            location,
            full_name
        }

        const profile=req.files.profile && req.files.profile[0];
        const cover=req.files.cover && req.files.cover[0];

        if(profile){
            const buffer=fs.readFileSync(profile.path);
            const response=await imagekit.upload({
                file: buffer,
                fileName: profile.originalname,
            })
            const url=imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '512'}
                ]
            })
            updatedData.profile_picture=url;
        }

        if(cover){
            const buffer=fs.readFileSync(cover.path);
            const response=await imagekit.upload({
                file: buffer,
                fileName: profile.originalname,
            })
            const url=imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '1280'}
                ]
            })
            updatedData.cover_picture=url;
        }

        const User=await user.findByIdAndUpdate(userId,updatedData,{new: true})
        res.json({success: true,User,message: 'Profile updated successfully'});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//find users using usrename, email, location, name
export const discoverUsers=async (req,res)=>{
    try{
        const { userId }=req.auth();
       const {input}=req.body;
       const allUsers=await user.find({
        $or: [
            {username: new RegExp(input,'i')},
            {email: new RegExp(input,'i')},
            {full_name: new RegExp(input,'i')},
            {location: new RegExp(input,'i')},
        ]
       })
       const filteredUers=allUsers.filter((user)=>(user._id !== userId));
       res.json({success: true,users: filteredUers});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//follow user
export const followUser=async (req,res)=>{
    try{
        const { userId }=req.auth();
       const {id}=req.body;

       const User=await user.findById(userId);

       if(User.following.includes(id)){
        return res.json({success: false,message: 'You are already following this user'});
       }
       User.following.push(id);
       await User.save();

       const toUser=await user.findById(id);
       toUser.followers.push(userId);
       await toUser.save();

       res.json({success: true,message: 'Now you are following this user'});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//Unfollow user
export const unfollowUser=async (req,res)=>{
    try{
        const { userId }=req.auth();
       const {id}=req.body;

       const User=await user.findById(userId);
       User.following=User.following.filter((user)=>user!==id);
       await User.save();

       const toUser=await user.findById(userId);
       toUser.followers=toUser.followers.filter((user)=>user!==id);
       await toUser.save();

       res.json({success: true,message: 'You are no longer following this user'});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//Connection req send
export const sendConnectionRequest= async(req,res)=>{
    try{
        const {userId}=req.auth();
        const {id}=req.body;

        //Check if user has sent more than 20 connection requests in the last 24 hours
        const last24Hours=new Date(Date.now()-24*60*60*1000)
        const connectionRequests=await Connection.find({from_user_id: userId,
            created_at: {$gt: last24Hours}});
            if(connectionRequests.length >= 20){
                return res.json({success: false,message: 'You have sent more then 20 connection requests in the last 24 hours'})
            }
        //check if users are already connected
        const connection=await Connection.findOne({
            $or: [
                {from_user_id: userId, to_user_id: id},
                {from_user_id: id, to_user_id: userId}, 
            ]
        })

        if(!connection){
            await Connection.create({
                from_user_id: userId,
                to_user_id: id
            })
            return res.json({success: true,message: 'Connection request sent successfully'});
        }
        else if(connection && connection.status === 'accepted'){
            return res.json({success: false,message: 'You are already connected with this user'});
        }
        return res.json({success: false,message: 'Connection request pending'});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//Get user connection
export const getUserConnections= async(req,res)=>{
    try{
        const {userId}=req.auth();
        const User=await user.findById(userId).populate('connections followers following');

        const connections=User.connections;
        const followers=User.followers;
        const following=user.following;

        const pendingConnections=(await Connection.find({to_user_id: userId,
            Status: 'pending'}).populate('from_user_id')).map(connection=>connection.from_user_id)

        res.json({success: true, connections, followers, following, pendingConnections});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//Accept connection request
export const acceptConnectionRequest= async(req,res)=>{
    try{
        const {userId}=req.auth();
        const {id}=req.body;

       const connection = await Connection.findOne({from_user_id: id,to_user_id: userId})

       if(!connection){
            return res.json({success: false, message: 'Connection not found'});
       }
       const User=await user.findById(userId);
       User.connections.push(id);
       await User.save();

       const toUser=await user.findById(id);
       toUser.connections.push(userId);
       await toUser.save();

       connection.status='accepted';
       await connection.save();

       res.json({success: true, message: 'Connection accepted successfully'});
    }
    catch(error){
        console.log(error);
        res.json({success: false,message: error.message});
    }
}