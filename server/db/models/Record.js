const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  latest_results: [{
    type: Number
  }],
  taken_attempts: {
    type: Number
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = new mongoose.model("Record", recordSchema);
