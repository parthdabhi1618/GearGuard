import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; 
import maintenanceRoutes from "./routes/maintenance.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"; // 
import equipmentRoutes from "./routes/equipment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection with AUTO-FIX
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // --- 🛠️ AUTO-FIX: DELETE THE BAD INDEX ---
    try {
      await mongoose.connection.collection("users").dropIndex("username_1");
      console.log("🔥 Fixed: Deleted old 'username' index from database.");
    } catch (err) {
      // If the index is already gone, this error is normal, we just ignore it.
    }
    // ------------------------------------------

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/equipment", equipmentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("GearGuard API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});