const usersRouter = require("./users.js");
// const { join } = require("path");
const { Router } = require("express");

const router = new Router();

// router.get("*", (_, res) => {
// res.sendFile("index.html", { root: join(__dirname, "../../client/public") });
// });

router.use("/users", usersRouter);

module.exports = router;
