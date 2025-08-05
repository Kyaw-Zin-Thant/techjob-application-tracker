const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String },
    date: { type: String }, // store as string from frontend
    status: { type: String, default: 'Applied' },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
