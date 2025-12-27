const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['technician', 'employee', 'manager'],
    default: 'employee',
  },
  email: {
    type: String,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
