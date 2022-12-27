const router = require("express").Router();
const {
  register,
  login,
  googleLogin,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.post("/googlelogin", googleLogin);

module.exports = router;
