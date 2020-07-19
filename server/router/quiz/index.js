const labContentRouter = require("./labcontent.js");
const addQuiz = require("../../controllers/quiz/add-quiz.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../../middlewares");
const { Router } = require("express");

const router = new Router();

router.use("/labcontent", labContentRouter);

router.post(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  addQuiz
);

module.exports = router;
