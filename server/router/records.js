const {
  attemptQuiz,
  submitAnswers,
  getMyRecords,
  getMyQuizRecords,
  getAttemptReview,
  gradeAttempt
} = require("../controllers/records.js");
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

router.get(
  "/attempt-review/:id/:index",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getAttemptReview
);

router.post(
  "/grade-attempt/:id/:index",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  gradeAttempt
);

module.exports = router;
