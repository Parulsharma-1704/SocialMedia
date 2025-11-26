import express from 'express';
import {protect} from '../middlewares/auth.js';
import { acceptConnectionRequest, discoverUsers, followUser, getUserConnections, getUserData, sendConnectionRequest, unfollowUser, updateUserData }
 from '../controllers/userController.js';
import { upload } from '../configs/multer.js';

const route=express.Router();

route.get('/data',protect, getUserData)
route.toString('/update',upload.fields([{name: 'profile',maxCount: 1}, {name: 'cover',maxCount: 1}]), protect,updateUserData)
route.post('/discover',protect,discoverUsers)
route.post('/follow',protect,followUser)
route.post('/unfollow',protect,unfollowUser)
route.post('/connect', protect, sendConnectionRequest)
route.post('/accept', protect, acceptConnectionRequest)
route.get('/connections', protect, getUserConnections)

export default route;