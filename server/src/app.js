import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dashboardRoutes from "./routes/dashboard.routes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/dashboard", dashboardRoutes);

export default app;
