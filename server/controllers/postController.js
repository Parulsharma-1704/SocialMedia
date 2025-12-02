import imagekit from "../configs/imageKit.js";
import Post from "../models/post.js";
import user from "../models/user.js";
import fs from 'fs'


//Add post
export const addPost= async (req, res)=>{
    try {
        const {userId}= req.auth();
        const {content, post_type}= req.body;
        const images=req.files;

        let image_urls=[];

        if(images.length){
            image_urls= await Promise.all(
                images.map(async (image)=>{
                    const fileBuffer= fs.readFileSync(image.path);
                    const response= await imagekit.upload({
                        file: fileBuffer,
                        fileName: image.originalname,
                        folder: 'posts',
                    })

                    const url= imagekit.url({
                        path: response.filePath,
                        transformation: [
                            {quality: 'auto'},
                            {format: 'webp'},
                            {width: '1280'},
                        ]
                    })
                    return url;
                })
            )
            await Post.create({
                user: userId,
                content,
                image_urls,
                post_type
            })
            res.json({success: true, message: "Post created successfully"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//get post

export const getFeedPosts= async (req, res)=>{
    try {
        const {userId}=req.auth();
        const User= await user.findById(userId)

        //User connections and followers
        const userIds= {userId, ...User.connections, ...User.following}
        const posts= (await Post.find({user: {$in: userIds}}).populate('user')).toSorted({createdAt: -1});

        res.json({success: true, posts});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//like post

export const likePost= async (req, res)=>{
    try {
        const {userId}=req.auth();
        const {postId}=req.body;

        const post = await Post.findById(postId)

        if(post.likes_count.includes(userId)){
            post.likes_count= post.likes_count.filter(u => u !== userId)
            await post.save();
            res.json({success: true, message: 'Post unliked'});
        }
        else{
            post.likes_count.push(userId)
            await post.save()
            res.json({success: true, message: "Post liked"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}