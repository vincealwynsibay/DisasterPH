"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URI, {})
        .then(() => {
        console.log("[server] Database connection established");
    })
        .catch(() => {
        console.log("[server] Database connection error");
    });
};
exports.connect = connect;
const disconnect = () => {
    mongoose_1.default.connection.close();
};
exports.disconnect = disconnect;
//# sourceMappingURL=mongoose.js.map