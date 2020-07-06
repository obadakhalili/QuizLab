const {
  login,
  logout,
  signup,
  getAccount,
  updateAccount,
  deleteAccount,
  getAvatar,
  updateAvatar,
  deleteAvatar
} = require("../controllers/user.js");
const {
  auth,
  validatePseudorandom,
  setPseudorandomAndSignatureCookies,
  setHeaderAndPayloadCookie
} = require("../middlewares");
const { Router } = require("express");
const multer = require("multer");

const router = new Router();
const upload = multer({
  limits: {
    fileSize: 1.5 * 1000000 // 1.5 megabytes
  },
  fileFilter(_, { originalname }, cb) {
    if (/\.(png|jpe?g)$/.test(originalname)) {
      return cb(undefined, true);
    }
    cb(new Error("Extension name must be either png, jpg, or jpeg"));
  }
});

router.post(
  "/login",
  login,
  setPseudorandomAndSignatureCookies,
  setHeaderAndPayloadCookie,
  (req, res) => {
    res.json(req.user);
  }
); // public
router.get("/logout", logout); // public

router
  .route("/")
  .post(signup) // public
  .get(auth, validatePseudorandom, setHeaderAndPayloadCookie, getAccount) // private
  .patch(auth, validatePseudorandom, setHeaderAndPayloadCookie, updateAccount) // private
  .delete(auth, validatePseudorandom, setHeaderAndPayloadCookie, deleteAccount); // private

router // private
  .route("/avatar")
  .get(auth, getAvatar)
  .post(
    auth,
    validatePseudorandom,
    setHeaderAndPayloadCookie,
    upload.single("avatar"),
    updateAvatar,
    ({ message }, req, res, next) => {
      res.status(400).send(message);
    }
  )
  .delete(auth, validatePseudorandom, setHeaderAndPayloadCookie, deleteAvatar);

module.exports = router;
