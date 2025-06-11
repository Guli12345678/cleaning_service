const {
  add,
  updateById,
  removeById,
  findAll,
} = require("../controllers/clients.controller");
const authGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", add);
router.get("/", authGuard, findAll);
router.patch("/:id", updateById);
router.delete("/:id", removeById);

module.exports = router;
