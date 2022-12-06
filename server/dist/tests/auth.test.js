"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("../utils/mongoose");
describe("Auth API", () => {
    beforeAll(async () => {
        await (0, mongoose_1.connect)();
    });
    afterAll(async () => {
        await (0, mongoose_1.disconnect)();
    });
    beforeEach(async () => {
        await user_1.default.deleteMany({});
    });
    it("should register a user", async () => {
        const res = await (0, supertest_1.default)("/api/auth").post("/register").send({
            email: "test1@test.com",
            password: "test1",
            username: "test1",
            firstName: "test",
            lastName: "1",
            middleInitial: "",
        });
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
    });
    it("should authenticate a user", async () => {
        const res = await (0, supertest_1.default)("/api/auth").post("/authenticate").send({
            email: "test1@test.com",
            password: "test1",
        });
        expect(res.status).toBe(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
    });
});
//# sourceMappingURL=auth.test.js.map