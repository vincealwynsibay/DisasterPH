// cloudinary import
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
export const cloudinaryUpload = multer({ storage });

// upload image with cloudinary and multer
export const uploadImage = async (file: any) => {
	// options for cloudinary
	const options = {
		folder: "disasterph/avatars",
		use_filename: true,
		unique_filename: false,
	};

	const result = await cloudinary.uploader.upload(file, options);
	return result.secure_url;
};
