"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, _req, res, _next) {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Something went wrong";
    }
    return res.status(statusCode).json({ message: err.message });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map