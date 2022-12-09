import { Schema, model, Types } from "mongoose";
import { ModelReference } from "../types";

export interface IPost {
	title: string;
	body: string;
	author: ModelReference;
	tags: string[];
	likes: ModelReference[];
	photos: [{ type: String }];
	createdAt?: string;
}

const postSchema = new Schema<IPost>({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	photos: [
		{
			type: String,
		},
	],
	author: {
		type: Types.ObjectId,
		ref: "User",
	},
	tags: [
		{
			type: String,
		},
	],
	likes: [
		{
			type: Types.ObjectId,
			ref: "User",
		},
	],
	createdAt: {
		type: String,
		default: new Date().toISOString(),
	},
});

export default model<IPost>("Post", postSchema);
