"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
describe("Auth API", () => {
    beforeEach(async () => {
        await mongoose_1.default.connect("mongodb://localhost:27017/disasterPHTest");
    });
    afterEach(async () => {
        await mongoose_1.default.connection.close();
    });
    beforeEach(async () => {
        await User_1.default.deleteMany({});
    });
    it("should register a user", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/auth/register").send({
            email: "test1@test.com",
            password: "test1",
            username: "test1",
            firstName: "test",
            lastName: "1",
            middleInitial: "",
        });
        console.log("res.body ", res.body);
    });
});
//# sourceMappingURL=auth.test.js.map