import { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError";
import User from "../models/User";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { IGetUserAuthRequest } from "../types";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password, username, firstName, lastName, middleInitial } =
		req.body;

	const user = await User.findOne({ email });

	if (user) {
		throw new ExpressError("Email already taken", 400);
	}

	const passwordHash = bcrypt.hash(password, 10);
	const avatar = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);

	const newUser = new User({
		firstName,
		middleInitial,
		lastName,
		username,
		email,
		password: passwordHash,
		avatar,
	});

	await newUser.save();
	return res.json({ ok: true });
};

const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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

const getCurrent = async (
	req: IGetUserAuthRequest,
	res: Response,
	next: NextFunction
) => {
	return res.json(req.user);
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {};

const getById = async (req: Request, res: Response, next: NextFunction) => {};

const _delete = async (req: Request, res: Response, next: NextFunction) => {};

const update = async (req: Request, res: Response, next: NextFunction) => {};

const updateAvatar = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

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
