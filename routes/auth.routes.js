const {
  register,
  login,
  logout,
  refreshToken,
  activate,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activate/:link", activate);
router.get("/refresh", refreshToken);

module.exports = router;
