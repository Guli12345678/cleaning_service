const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/admin.controller");
const adminJwtGuard = require("../middleware/guards/admin-jwt.guard");
const adminSelfGuard = require("../middleware/guards/admin-self.guard");
const authGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", adminJwtGuard, adminSelfGuard, updateById);
router.get("/", authGuard, findAll);
router.get("/:id", adminJwtGuard, adminSelfGuard, findOne);
router.delete("/:id", removeById);

module.exports = router;
