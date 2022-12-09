import { Request, Response, NextFunction } from "express";

async function paginate(req: Request, model: any) {
	const page = parseInt(req.query.page as string, 10);
	const limit = parseInt(req.query.limit as string, 10);

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results: any = {};

	if (endIndex < (await model.countDocuments().exec())) {
		results.next = {
			page: page + 1,
			limit: limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit,
		};
	}

	results.results = await model.find().limit(limit).skip(startIndex).exec();
	return results;
}

export default paginate;
