const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  student: {
    type: String,
  },
  dean: {
    type: String,
    required: true,
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
