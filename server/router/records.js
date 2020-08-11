const { checkRecord, submitAnswers } = require("../controllers/records.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.post(
  "/check-record",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  checkRecord
);

router.post(
  "/submit-answers",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  submitAnswers
);

module.exports = router;
