import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected locally");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1); //process code 1 means exit
	}
};

export default connectDB;
