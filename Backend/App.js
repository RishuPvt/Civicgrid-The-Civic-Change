import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const allowedOrigins = [
  "https://civicgrid-the-civic-change.vercel.app",
  "http://localhost:5173",
];


const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
};
const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use(cookieParser());


import userRouter from "./src/Routes/User.Route.js";

app.use("/api/v1/users", userRouter);

import TaskRouter from "./src/Routes/Task.Router.js";

app.use("/api/v1/users/task", TaskRouter);

import RewardRouter from "./src/Routes/Reward.Router.js";

app.use("/api/v1", RewardRouter);


export { app };
