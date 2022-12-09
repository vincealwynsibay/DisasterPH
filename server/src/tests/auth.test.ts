// auth api tests

import mongoose from "mongoose";
import request from "supertest";
// import { connect } from "../utils/mongoose";
import User from "../models/User";
import app from "../app";

describe("Auth API", () => {
	beforeEach(async () => {
		await mongoose.connect("mongodb://localhost:27017/disasterPHTest");
	});
	afterEach(async () => {
		await mongoose.connection.close();
	});
	beforeEach(async () => {
		await User.deleteMany({});
	});

	it("should register a user", async () => {
		const res = await request(app).post("/api/auth/register").send({
			email: "test1@test.com",
			password: "test1",
			username: "test1",
			firstName: "test",
			lastName: "1",
			middleInitial: "",
		});
		console.log("res.body ", res.body);
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
