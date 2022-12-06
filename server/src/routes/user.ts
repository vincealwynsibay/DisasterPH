import express from "express";
import verifyAuth from "../utils/jwt";
import userController from "../controllers/user";
import { cloudinaryUpload } from "../utils/cloudinary";
const router = express.Router();

// route for all users
router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.put(
	"/:id/avatar",
	verifyAuth,
	cloudinaryUpload.single("avatar"),
	userController.updateAvatar
);

router.put("/:id", verifyAuth, userController.update);

router.delete("/:id", verifyAuth, userController.update);

export default express;
