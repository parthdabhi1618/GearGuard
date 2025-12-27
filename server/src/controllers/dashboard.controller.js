import Equipment from "../models/Equipment.model.js";
import Maintenance from "../models/Maintenance.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEquipment = await Equipment.countDocuments();
    const scrappedEquipment = await Equipment.countDocuments({ status: "scrapped" });
    const openRequests = await Maintenance.countDocuments({ status: "open" });

    const overdueRequests = await Maintenance.countDocuments({
      status: { $ne: "done" },
      scheduledDate: { $lt: new Date() },
    });

    res.json({
      totalEquipment,
      scrappedEquipment,
      openRequests,
      overdueRequests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
