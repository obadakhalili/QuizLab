const {
  attemptQuiz,
  submitAnswers,
  getMyRecords,
  getMyQuizRecords
} = require("../controllers/records.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.get(
  "/my-records",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getMyRecords
);

router.get(
  "/my-quiz-records",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getMyQuizRecords
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
