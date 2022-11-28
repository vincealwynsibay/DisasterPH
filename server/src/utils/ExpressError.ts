class ExpressError extends Error {
	statusCode = "500";

	constructor(message: string, statusCode: string) {
		super(message);
		Object.setPrototypeOf(this, ExpressError.prototype);
		this.statusCode = statusCode;
	}
}

export default ExpressError;
