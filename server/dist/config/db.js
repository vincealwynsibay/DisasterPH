"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    const MONGO_URI = process.env.NODE_ENV === "production"
        ? process.env.MONGO_PROD_URI
        : process.env.MONGO_DEV_URI;
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => {
        console.log("[server] Database connection established");
    })
        .catch(() => {
        console.log("[server] Database connection error");
    });
}
exports.default = connectDB;
//# sourceMappingURL=db.js.map