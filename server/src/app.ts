import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import errorHandler from "./utils/errorHandler";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/ping", (_req, res) => {
	res.json("pong");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(errorHandler);

export default app;
