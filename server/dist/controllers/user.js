"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const gravatar_1 = __importDefault(require("gravatar"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("../utils/cloudinary");
const register = async (req, res) => {
    const { email, password, username, firstName, lastName, middleInitial } = req.body;
    console.log("req.body ", req.body);
    const user = await User_1.default.findOne({ email });
    if (user) {
        throw new ExpressError_1.default("Email already taken", 400);
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const avatar = gravatar_1.default.url(email, { s: "100", r: "x", d: "retro" }, true);
    console.log(passwordHash, avatar);
    const newUser = new User_1.default({
        firstName,
        middleInitial,
        lastName,
        username,
        email,
        password: passwordHash,
        avatar,
        createdAt: Date(),
    });
    console.log("newUser", newUser);
    await newUser.save();
    return res.json({ ok: true });
};
const authenticate = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new ExpressError_1.default(`User not found`, 400);
    }
    const isValid = await bcryptjs_1.default.compare(password, user.password);
    if (isValid) {
        throw new ExpressError_1.default(`Invalid email or password`, 400);
    }
    const token = jsonwebtoken_1.default.sign({ sub: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return res.json({ user, token });
};
const getCurrent = async (req, res) => {
    return res.json(req.user);
};
const getAll = async (_req, res) => {
    const users = await User_1.default.find({});
    return res.json(users);
};
const getById = async (req, res) => {
    const user = await User_1.default.findById(req.params.id);
    return res.json(user);
};
const _delete = async (req, res) => {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    return res.json(user);
};
const update = async (req, res) => {
    const { username } = req.body;
    const user = await User_1.default.findById(req.params.id);
    if (!user) {
        throw new ExpressError_1.default(`User not found`, 400);
    }
    if (await User_1.default.findOne({ username })) {
        throw new ExpressError_1.default(`Username already taken`, 400);
    }
    const userParam = req.body;
    if (userParam.password) {
        userParam.password = bcryptjs_1.default.hash(userParam.password, 10);
    }
    Object.assign(user);
    await user.save();
    return res.json(user);
};
const updateAvatar = async (req, res) => {
    var _a;
    const user = await User_1.default.findById(req.params.id);
    if (!user) {
        throw new ExpressError_1.default(`User not found`, 400);
    }
    const url = await (0, cloudinary_1.uploadImage)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    user.avatar = url;
    await user.save();
    return res.json(user);
};
exports.default = {
    register,
    authenticate,
    getAll,
    getById,
    getCurrent,
    _delete,
    update,
    updateAvatar,
};
//# sourceMappingURL=user.js.map