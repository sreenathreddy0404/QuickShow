import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("Database connected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`)
    } catch (error) {
        console.log("mongodb connection error : ",error.message)
    }
}

export default connectDB;