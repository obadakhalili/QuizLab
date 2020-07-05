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
const { auth, validatePseudorandom } = require("../middlewares");
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

router.post("/login", login); // public
router.get("/logout", logout);

router
  .route("/")
  .post(signup) // public
  .get(auth, validatePseudorandom, getAccount) // private
  .patch(auth, validatePseudorandom, updateAccount) // private
  .delete(auth, validatePseudorandom, deleteAccount); // private

router // private
  .route("/avatar")
  .get(auth, getAvatar)
  .post(
    auth,
    validatePseudorandom,
    upload.single("avatar"),
    updateAvatar,
    ({ message }, _0, res, _1) => {
      res.status(400).send(message);
    }
  )
  .delete(auth, validatePseudorandom, deleteAvatar);

module.exports = router;
