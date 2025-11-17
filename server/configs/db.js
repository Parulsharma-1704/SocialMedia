import mongoose from "mongoose";

 mongoose.connection.on('connected',()=>(console.log('Database connected!')));

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/socialMedia`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;