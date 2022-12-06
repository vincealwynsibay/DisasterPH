"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
(0, db_1.default)();
const PORT = process.env.PORT || 5000;
app.get("/ping", (_req, res) => {
    res.json("pong");
});
app.listen(PORT, () => {
    console.log(`[server] Server running on port http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map