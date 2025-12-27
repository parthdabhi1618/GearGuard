import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['technician', 'manager', 'admin'], 
    default: 'technician' 
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, { timestamps: true });

// 🟢 CORRECTED PRE-SAVE HOOK
// 1. We removed 'next' from the function arguments: async function()
// 2. We removed 'next()' calls inside the function.
userSchema.pre('save', async function() {
  // If password is not modified, simply return (stops execution)
  if (!this.isModified('password')) return;

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  
  // No need to call next(); the async function finishing signals "done" to Mongoose
});

export default mongoose.model('User', userSchema);