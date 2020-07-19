const userRouter = require("./user.js");
const quizRouter = require("./quiz");
const { Router } = require("express");

const router = new Router();

router.use("/user", userRouter);
router.use("/quiz", quizRouter);

module.exports = router;
