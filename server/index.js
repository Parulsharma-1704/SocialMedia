import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import { clerkMiddleware } from '@clerk/express';
import route from './routes/userRoutes.js';
import { Connection } from 'mongoose';
import sendEmail from './configs/nodeMailer.js';

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

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>(console.log(`Server is running on port ${PORT}`)));