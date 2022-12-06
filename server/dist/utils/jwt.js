"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressError_1 = __importDefault(require("./ExpressError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
async function verifyAuth(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new ExpressError_1.default("Token not found", 401);
        }
        token = token.split(" ")[1];
        const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new ExpressError_1.default("Invalid Token", 401);
        }
        req.user = await User_1.default.findById(decoded.sub);
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.default = verifyAuth;
//# sourceMappingURL=jwt.js.map