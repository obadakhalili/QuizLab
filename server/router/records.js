const { checkRecord } = require("../controllers/records.js");
const {
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
} = require("../middlewares");
const { Router } = require("express");

const router = new Router();

router.post(
  "/",
  auth,
  validatePseudorandom,
  setHeaderAndPayloadCookie,
  checkRecord
);

module.exports = router;
