const { connect } = require("mongoose");

(async () => {
  try {
    await connect("mongodb://127.0.0.1/quizlab", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connected to database");
    require("../index.js");
  } catch (e) {
    console.log("Database connection failure\n", e);
    process.exit(1);
  }
})();
