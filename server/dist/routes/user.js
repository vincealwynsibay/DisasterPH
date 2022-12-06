"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_1 = __importDefault(require("../controllers/user"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const router = express_1.default.Router();
router.post("/register", (0, catchAsync_1.default)(user_1.default.register));
router.post("/login", (0, catchAsync_1.default)(user_1.default.authenticate));
router.get("/me", jwt_1.default, (0, catchAsync_1.default)(user_1.default.getCurrent));
exports.default = router;
//# sourceMappingURL=user.js.map