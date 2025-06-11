const {
  add,
  findAll,
  updateById,
  removeById,
} = require("../controllers/admin.controller");
const authGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/", authGuard, findAll);
router.delete("/:id", removeById);

module.exports = router;
