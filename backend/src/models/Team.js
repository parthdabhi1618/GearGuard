const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  technicians: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // "Control who can work on what" - linking technicians
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
