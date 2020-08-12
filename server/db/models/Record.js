const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  attempts: [{ type: Object }],
  quiz: {
    type: mongoose.Schema.Types.ObjectId
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = new mongoose.model("Record", recordSchema);
