import express from "express";
import catchAsync from "../utils/catchAsync";
import userController from "../controllers/user";
import verifyAuth from "../utils/jwt";
const router = express.Router();

// auth
router.get("/", (_req, res, _next) => {
	return res.json({ message: "ping from auth" });
});
router.post("/register", catchAsync(userController.register));
router.post("/login", catchAsync(userController.authenticate));
router.get("/me", verifyAuth, catchAsync(userController.getCurrent));

export default router;
