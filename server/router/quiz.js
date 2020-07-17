const {
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes
} = require("../controllers/quiz.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router
  .route("/")
  .post(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    addQuiz
  )
  .get(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    getAllQuizzes
  )

router
  .route("/:id")
  .get(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    getQuiz
  )
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

module.exports = router;
