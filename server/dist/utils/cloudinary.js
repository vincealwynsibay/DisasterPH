"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer_1.default.diskStorage({});
exports.cloudinaryUpload = (0, multer_1.default)({ storage });
const uploadImage = async (file) => {
    const options = {
        folder: "disasterph/avatars",
        use_filename: true,
        unique_filename: false,
    };
    const result = await cloudinary_1.v2.uploader.upload(file, options);
    return result.secure_url;
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary.js.map