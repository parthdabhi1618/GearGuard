import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serialNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ["active", "scrapped"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
