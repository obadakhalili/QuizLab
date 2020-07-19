const Quiz = require("../../db/models/Quiz.js");

module.exports = async (req, res) => {
  try {
    await Quiz({ ...req.body, owner: req.user._id }).save();
    res.end();
  } catch (e) {
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map(({ message })=> message);
      return res.status(400).json(errors);
    }
    res.status(500).send("Internal Server Error");
  }
};
