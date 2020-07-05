const userRouter = require("./user.js");
// const { join } = require("path");
const { Router } = require("express");

const router = new Router();

// router.get("*", (_, res) => {
// res.sendFile("index.html", { root: join(__dirname, "../../client/public") });
// });

router.use("/user", userRouter);

module.exports = router;
