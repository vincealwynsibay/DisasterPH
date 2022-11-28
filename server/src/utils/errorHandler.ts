import { Request, Response, NextFunction } from "express";

function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { statusCode = 500 } = err;

	if (!err.message) {
		err.message = "Something went wrong";
	}

	return res.status(statusCode).json({ message: err.message });
}
