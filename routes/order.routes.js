const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/orders.controller");
const clientJwtGuard = require("../middleware/guards/client-jwt.guard");

const router = require("express").Router();

router.post("/", clientJwtGuard, add);
router.patch("/:id", updateById);
router.get("/", findAll);
router.get("/:id", findOne);
router.delete("/:id", removeById);

module.exports = router;
