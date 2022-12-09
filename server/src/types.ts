import { Types } from 'mongoose';
import { Request } from "express";

export interface IGetUserAuthRequest extends Request {
	user?: any;
}

export interface ModelReference {
	type: typeof Types.ObjectId;
	ref: string;
}
