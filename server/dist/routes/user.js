"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const user_1 = __importDefault(require("../controllers/user"));
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
router.get("/", user_1.default.getAll);
router.get("/:id", user_1.default.getById);
router.put("/:id/avatar", jwt_1.default, cloudinary_1.cloudinaryUpload.single("avatar"), user_1.default.updateAvatar);
router.put("/:id", jwt_1.default, user_1.default.update);
router.delete("/:id", jwt_1.default, user_1.default.update);
exports.default = express_1.default;
//# sourceMappingURL=user.js.map