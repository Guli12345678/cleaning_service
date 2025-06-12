const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/assignments.controller")
const adminJwtGuard = require("../middleware/guards/admin-jwt.guard");
const roleGuard = require("../middleware/guards/role.guard");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", adminJwtGuard, roleGuard, updateById);
router.get("/", findAll);
router.get("/:id", findOne);
router.delete("/:id", removeById);

module.exports = router;
