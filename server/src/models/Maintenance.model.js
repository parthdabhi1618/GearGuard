import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    title: String,
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "done"],
      default: "open",
    },
    scheduledDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", maintenanceSchema);
