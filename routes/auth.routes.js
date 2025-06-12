const {
  registerClient,
  registerOwner,
  registerAdmin,
  logoutClient,
  logoutAdmin,
  logoutOwner,
  refreshClientToken,
  refreshAdminToken,
  refreshOwnerToken,
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
router.post("/logoutClient", logoutClient);
router.post("/logoutAdmin", logoutAdmin);
router.post("/logoutOwner", logoutOwner);
router.get("/clients/activate/:link", activateClients);
router.get("/admin/activate/:link", activateAdmins);
router.get("/owner/activate/:link", activateOwners);
router.get("/refreshClient", refreshClientToken);
router.get("/refreshAdmin", refreshAdminToken);
router.get("/refreshOwner", refreshOwnerToken);

module.exports = router;
