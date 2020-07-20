const {
  getMyQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
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

router
  .route("/:id")
  .patch(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    updateQuiz
  )
  .delete(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    deleteQuiz
  );

router.get(
  "/labcontent/:id",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getLabContent
);

module.exports = router;
