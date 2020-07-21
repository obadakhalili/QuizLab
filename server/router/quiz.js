const {
  getMyQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuizs,
  getLabContent
} = require("../controllers/quiz.js");
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
  getMyQuizzes
);

router.post(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  addQuiz
);

router.patch(
  "/:id",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  updateQuiz
);

router.delete(
  "/(:id)?",
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
