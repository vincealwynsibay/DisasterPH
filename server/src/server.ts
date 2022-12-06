import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./config/db";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/ping", (_req, res) => {
	res.json("pong");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
	console.log(`[server] Server running on port http://localhost:${PORT}/`);
});
