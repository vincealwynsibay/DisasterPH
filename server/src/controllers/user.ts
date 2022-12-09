import { Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import User from "../models/User";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/cloudinary";
import { IGetUserAuthRequest } from "../types";

const register = async (req: Request, res: Response) => {
	const { email, password, username, firstName, lastName, middleInitial } =
		req.body;

	console.log("req.body ", req.body);

	const user = await User.findOne({ email });

	if (user) {
		throw new ExpressError("Email already taken", 400);
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const avatar = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);

	console.log(passwordHash, avatar);
	const newUser = new User({
		firstName,
		middleInitial,
		lastName,
		username,
		email,
		password: passwordHash,
		avatar,
		createdAt: Date(),
	});

	console.log("newUser", newUser);
	await newUser.save();
	return res.json({ ok: true });
};

const authenticate = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw new ExpressError(`User not found`, 400);
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (isValid) {
		throw new ExpressError(`Invalid email or password`, 400);
	}

	const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});

	return res.json({ user, token });
};

const getCurrent = async (req: IGetUserAuthRequest, res: Response) => {
	return res.json(req.user);
};

// get all users
const getAll = async (_req: Request, res: Response) => {
	const users = await User.find({});
	return res.json(users);
};

// get user by id
const getById = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	return res.json(user);
};

// delete user by id
const _delete = async (req: Request, res: Response) => {
	const user = await User.findByIdAndDelete(req.params.id);
	return res.json(user);
};

// find user by id and update user
const update = async (req: IGetUserAuthRequest, res: Response) => {
	const { username } = req.body;
	const user = await User.findById(req.params.id);

	// if user not found
	if (!user) {
		throw new ExpressError(`User not found`, 400);
	}

	// if username already taken
	if (await User.findOne({ username })) {
		throw new ExpressError(`Username already taken`, 400);
	}

	const userParam = req.body;

	// password update
	if (userParam.password) {
		userParam.password = bcrypt.hash(userParam.password, 10);
	}

	// copy userParam properties to user
	Object.assign(user);

	// save user
	await user.save();
	return res.json(user);
};

const updateAvatar = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);

	// if user not found
	if (!user) {
		throw new ExpressError(`User not found`, 400);
	}

	const url = await uploadImage(req.file?.path);

	user.avatar = url;

	await user.save();
	return res.json(user);
};

export default {
	register,
	authenticate,
	getAll,
	getById,
	getCurrent,
	_delete,
	update,
	updateAvatar,
};
