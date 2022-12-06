// auth api tests

import mongoose from "mongoose";
import request from "supertest";
// import { connect } from "../utils/mongoose";

describe("Auth API", () => {
	beforeAll(async () => {
		await mongoose.connect("mongodb://localhost:27017/test");
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});
	// beforeEach(async () => {
	// 	await User.deleteMany({});
	// });
	it("should register a user", async () => {
		const res = await request("/api/auth/").post("/register").send({
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

	// it("should authenticate a user", async () => {
	// 	const res = await request("/api/auth").post("/authenticate").send({
	// 		email: "test1@test.com",
	// 		password: "test1",
	// 	});
	// 	expect(res.status).toBe(200);
	// 	expect(res.body.user).toBeDefined();
	// 	expect(res.body.token).toBeDefined();
	// });

	// // get current user
	// it("should get current user", async () => {
	//     const res = await request
	//         ('/api/auth').get("/me")
	//         .set("Authorization", `Bearer ${token}`);
	//     expect(res.status).toBe(200);
	//     expect(res.body.user).toBeDefined();
	// }
});
