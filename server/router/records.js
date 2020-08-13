const { attemptQuiz, submitAnswers, getMyRecords } = require("../controllers/records.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.get(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getMyRecords
);

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
