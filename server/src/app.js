import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dashboardRoutes from "./routes/dashboard.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/maintenance", maintenanceRoutes);

export default app;
