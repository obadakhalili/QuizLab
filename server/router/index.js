const usersRouter = require("./users.js");
const quizzesRouter = require("./quizzes.js");
const recordsRouter = require("./records.js");
const { Router } = require("express");

const router = new Router();

router.use("/users", usersRouter);
router.use("/quizzes", quizzesRouter);
router.use("/results", recordsRouter);

module.exports = router;
