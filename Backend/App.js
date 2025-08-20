import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173/",
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

export { app };
