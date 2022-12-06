import mongoose from "mongoose";
import "dotenv/config";

export const connect = () => {
	// connect to database
	mongoose
		.connect("mongodb://localhost:27017/disasterphTest")
		
};

export const disconnect = () => {
	// disconnect from database
	mongoose.connection.close();
};
