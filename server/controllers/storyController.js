import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import user from '../models/user.js';
import Story from '../models/story.js';
import { inngest } from '../inngest/index.js';

//Add user story
export const addUserStory= async(req, res)=>{
    try {
        const {userId}= req.auth();
        const {content, media_type, background_color}=req.body;
        const media= req.file;
        let media_url='';

        //upload media to imagekit
        if(media_type === 'image' || media_type === 'video'){
            const fileBuffer= fs.readFileSync(media.path);
            const response= await imagekit.upload({
                file: fileBuffer,
                fileName: media.originalname,
            })
            media_url=response.url;
        }
        //create story
        const story= await story.create({
            user: userId,
            content,
            media_url,
            media_type,
            background_color,
        })

        //schedule stpry deletetion after 24 hours
        await inngest.send({
            name: 'app/story.delete',
            data: {storyId: story._id}
        })

        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message});
    }
}

//Get user stories
export const getStories= async(req, res)=>{
    try {
        const {userId}= req.auth();
        const User= await user.findById(userId)

        //user connections and following
        const userIds = [userId,...User.connections, ...User.following]

        const stories= await Story.find({
            User: {$in: userIds}
        }).populate('user').sort({createdAt: -1});

        res.json({success: true, stories});

    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message});
    }
}
