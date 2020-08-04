const {
  addQuiz,
  getMyQuizzes,
  updateQuiz,
  deleteQuizzes,
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
  deleteQuizzes
);

router.get(
  "/labcontent/:id",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getLabContent
);

module.exports = router;
