const { attemptQuiz, submitAnswers } = require("../controllers/records.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.post(
  "/attempt-quiz",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  attemptQuiz
);

router.post(
  "/submit-answers",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  submitAnswers
);

module.exports = router;
