"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = 500;
        Object.setPrototypeOf(this, ExpressError.prototype);
        this.statusCode = statusCode;
    }
}
exports.default = ExpressError;
//# sourceMappingURL=ExpressError.js.map