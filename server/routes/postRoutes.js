import express from 'express';
import { upload } from '../configs/multer.js';
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';
import { protect } from '../middlewares/auth.js';

const postRoute= express.Router();

postRoute.post('/add',upload.array('images', 4), protect, addPost);
postRoute.get('/feed',protect, getFeedPosts);
postRoute.post('/like', protect, likePost);

export default postRoute;