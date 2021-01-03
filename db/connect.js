const { connect } = require("mongoose");

(async () => {
  try {
    await connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to database");
    require("../");
  } catch (e) {
    console.log("Database connection failure\n", e);
    process.exit(1);
  }
})();
