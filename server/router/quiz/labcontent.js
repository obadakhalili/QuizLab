const {
  getAllLabsContent,
  getLabContent,
  updateLabContent,
  deleteLabContent
} = require("../../controllers/quiz/labcontent.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../../middlewares");
const { Router } = require("express");

const router = new Router();

router.get(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  getAllLabsContent
);

router
  .route("/:id")
  .get(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    getLabContent
  )
  .patch(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    updateLabContent
  )
  .delete(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    deleteLabContent
  );

module.exports = router;
