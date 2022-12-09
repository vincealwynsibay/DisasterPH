import { Request, Response } from "express";
import { IGetUserAuthRequest } from "../types";
import Post from "../models/Post";
import User from "../models/User";
import ExpressError from "../utils/ExpressError";
import { uploadImage } from "../utils/cloudinary";
import paginate from "src/utils/paginate";

// get all posts
const getAll = async (req: Request, res: Response) => {
	const posts = await Post.find();
	res.status(200).json(posts);
};

// get posts by id
const getById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	res.status(200).json(post);
};

// create post w/ author and tag
const create = async (req: IGetUserAuthRequest, res: Response) => {
	const { title, body, tags } = req.body;

	// upload photos
	const photos: string[] = [];
	if (req.files) {
		const files = Object.values(req.files);
		files.forEach(async (file: any) => {
			const url = await uploadImage(file);
			photos.push(url);
		});
	}

	const post = await Post.create({
		title,
		body,
		tags,
		author: req.user.id,
		photos,
	});
	res.status(201).json(post);
};

// update post if owner
const update = async (req: IGetUserAuthRequest, res: Response) => {
	const { id } = req.params;

	const post = await Post.findById(id);

	if (!post) {
		throw new ExpressError("Post not found", 404);
	}

	const postParams = req.body;

	if (post.author.toString() !== req.user.id) {
		throw new ExpressError("Unauthorized", 401);
	}

	Object.assign(post, postParams);
	await post.save();
	res.status(201).json(post);
};

// delete post if owner
const _delete = async (req: IGetUserAuthRequest, res: Response) => {
	const { id } = req.params;
	const post = await Post.findById(id);

	if (!post) {
		throw new ExpressError("Post not found", 404);
	}

	if (post.author.toString() !== req.user.id) {
		throw new ExpressError("Unauthorized", 401);
	}

	await post.remove();
	res.status(200).json({ ok: true });
};

// paginated posts
const getPaginatedPosts = async (req: Request, res: Response) => {
	const posts = await paginate(req, Post);
	res.status(200).json(posts);
};

const getPostsByTag = async (req: Request, res: Response) => {
	const { tag } = req.params;
	const posts = await Post.find({ tags: tag });
	res.status(200).json(posts);
};

// search posts by name or tag
const search = async (req: Request, res: Response) => {
	const { query } = req.query;

	const posts = await Post.find({ title: { $regex: query, $options: "i" } });

	res.status(200).json(posts);
};

// sort posts by date_created and likes
const sort = async (req: Request, res: Response) => {
	const { query, order = "asc" } = req.query;

	const sortOrder: 1 | -1 =
		(order as string).toLowerCase() === "asc" ? 1 : -1;

	const posts = await Post.find().sort({ [query! as string]: sortOrder });

	res.status(200).json(posts);
};

// like or unlike post
const like = async (req: IGetUserAuthRequest, res: Response) => {
	const { id } = req.params;
	const post = await Post.findById(id);

	if (!post) {
		throw new ExpressError("Post not found", 404);
	}

	if (post.likes.includes(req.user.id)) {
		post.likes = post.likes.filter(
			(like) => like.toString() !== req.user.id.toString()
		);
	} else {
		post.likes.push(req.user.id);
	}

	await post.save();
	res.status(200).json(post);
};

export default {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getPostsByTag,
	getPaginatedPosts,
	search,
	sort,
	like,
};
