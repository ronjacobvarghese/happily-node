const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
  universityID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Dean', deanSchema);
