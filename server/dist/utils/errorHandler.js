"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Something went wrong";
    }
    return res.status(statusCode).json({ message: err.message });
}
//# sourceMappingURL=errorHandler.js.map