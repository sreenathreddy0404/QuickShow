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
// API Controller function to update favorite Movie in Clerk User Metadata
export const updateFavorite = async (req, res) => {
	try {
		const { movieId } = req.body;
		const { userId } = req.auth();

		const user = await clerkClient.users.getUser(userId);

		// Clone the existing privateMetadata or set a default
		let favorites = user.privateMetadata.favorites || [];

		// Toggle logic: add if not there, remove if already exists
		if (favorites.includes(movieId)) {
			favorites = favorites.filter(item => item !== movieId);
		} else {
			favorites.push(movieId);
		}

		// Update user metadata (safe and clean)
		await clerkClient.users.updateUserMetadata(userId, {
			privateMetadata: {
				...user.privateMetadata,
				favorites,
			},
		});

		res.json({ success: true, message: "Favorite updated successfully" });
	} catch (error) {
		console.error("Error in updating favorites:", error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};


//get favorite movies
export const getFavorites = async(req,res)=>{
    try {
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;
        //Getting movies from database
        const movies = await Movie.find({_id:{$in:favorites}})

        res.json({success:true,movies});
    } catch (error) {
        console.error("Error in fetching favorites : ",error.message)
        res.json({success:false,message:error.message});
    }
}