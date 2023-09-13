const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  dean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dean",
  },
  slotTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "booked"],
    default: "pending",
  },
});

module.exports = mongoose.model("Session", sessionSchema);
