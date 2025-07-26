import { clerkClient} from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


//api controller function to get user bookings
export const getUserBookings = async(req,res)=>{
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path:"show",populate:{path:"movie"}
        }).sort({createdAt:-1})

        res.json({success:true,bookings})
    } catch (error) {
        console.error(error.message)
        res.json({success:false,message:error.message});
    }
}

//API Controller function to upate favorite Movie in Clerk User Metadata
export const updateFavorite = async(req,res)=>{
    try {
        const {movieId} = req.body;
        const {userId} = req.auth().userId;

        const user = await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites=[];
        }else{
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item=>item !== movieId);
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId);
        }

        await clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata})

        res.json({success:true,message:"Favorite updated Successfully"});
    } catch (error) {
        console.error(error.message)
        res.json({success:false,message:error.message});
    }
}

//get favorite movies
export const getFavorites = async(req,res)=>{
    try {
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;

        //Getting movies from database
        const movies = await Movie.find({_id:{$in:favorites}})

        res.json({success:true,movies});
    } catch (error) {
        console.error(error.message)
        res.json({success:false,message:error.message});
    }
}