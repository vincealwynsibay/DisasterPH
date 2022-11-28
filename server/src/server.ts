import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./config/db";

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

app.listen(PORT, () => {
	console.log(`[server] Server running on port http://localhost:${PORT}/`);
});
