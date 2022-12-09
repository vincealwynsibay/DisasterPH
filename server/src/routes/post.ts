import express from "express";
import verifyAuth from "../utils/jwt";
import postController from "../controllers/post";
import catchAsync from "../utils/catchAsync";
import { cloudinaryUpload } from "../utils/cloudinary";

const router = express.Router();

router.get("/", catchAsync(postController.getAll));
router.get("/paginated", catchAsync(postController.getPaginatedPosts));
router.get("/:id", catchAsync(postController.getById));
router.get("/tags/:tag", catchAsync(postController.getPostsByTag));
router.post("/search", catchAsync(postController.search));
router.get("/sort", catchAsync(postController.sort));

router.post(
	"/",
	verifyAuth,
	cloudinaryUpload.array("photos", 12),
	catchAsync(postController.create)
);
router.put("/:id", verifyAuth, catchAsync(postController.update));
router.delete("/:id", verifyAuth, catchAsync(postController.delete));

router.put("/:id/like", verifyAuth, catchAsync(postController.like));

export default router;
