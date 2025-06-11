const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/owners.controller");
const authGuard = require("../middleware/guards/auth.guard");
const ownerJwtGuard = require("../middleware/guards/owner-jwt.guard");
const ownerSelfGuard = require("../middleware/guards/owner-self.guard");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/:id", ownerJwtGuard, ownerSelfGuard, findOne);
router.get("/", findAll);
router.delete("/:id", removeById);

module.exports = router;
