const { signup, login } = require("../controllers/users.js");
const { Router } = require("express");

const router = new Router();

router.post("/login", login);

router.route("/").post(signup);

module.exports = router;
