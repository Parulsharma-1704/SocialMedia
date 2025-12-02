import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import { clerkMiddleware } from '@clerk/express';
import route from './routes/userRoutes.js';
import postRoute from './routes/postRoutes.js';
import storyRouter from './routes/storyRouter.js';
import messageRouter from './routes/messageRoutes.js';

const app=express();

//mongoDB connection
await connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


app.get('/',(req,res)=>(res.send('Server is running!')));

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use('/api/user',route);
app.use('/api/post', postRoute);
app.use('/api/story',storyRouter);
app.use('/api/message',messageRouter);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>(console.log(`Server is running on port ${PORT}`)));