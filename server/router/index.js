const usersRouter = require("./users.js");
const quizzesRouter = require("./quizzes.js");
const { Router } = require("express");

const router = new Router();

router.use("/users", usersRouter);
router.use("/quizzes", quizzesRouter);

module.exports = router;
