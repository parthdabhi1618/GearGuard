import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technician_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: String
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
