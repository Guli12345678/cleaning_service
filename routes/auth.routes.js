const {
  registerClient,
  registerOwner,
  registerAdmin,
  logout,
  refreshToken,
  activateClients,
  activateAdmins,
  activateOwners,
  loginAdmin,
  loginClient,
  loginOwner,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/registerAdmin", registerAdmin);
router.post("/registerOwner", registerOwner);
router.post("/registerClient", registerClient);
router.post("/loginAdmin", loginAdmin);
router.post("/loginClient", loginClient);
router.post("/loginOwner", loginOwner);
router.post("/logout", logout);
router.get("/clients/activate/:link", activateClients);
router.get("/admin/activate/:link", activateAdmins);
router.get("/owner/activate/:link", activateOwners);
router.get("/refresh", refreshToken);

module.exports = router;
