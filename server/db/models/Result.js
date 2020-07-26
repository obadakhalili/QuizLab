const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  results: [{
    type: Number
  }],
  leftAttempts: {
    type: Number
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = new mongoose.model("Result", resultSchema);
