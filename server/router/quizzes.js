const {
  addQuiz,
  getMyQuizzes,
  getMyQuizzesCount,
  updateQuiz,
  deleteQuizs,
  getLabContent
} = require("../controllers/quizzes.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.post(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  addQuiz
);

router.get(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getMyQuizzes
);

router.get(
  "/count",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getMyQuizzesCount
);

router.patch(
  "/:id",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  updateQuiz
);

router.post(
  "/delete",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  deleteQuizs
);

router.get(
  "/labcontent/:id",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getLabContent
);

module.exports = router;
