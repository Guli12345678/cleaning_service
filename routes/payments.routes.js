const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/payments.controller");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/", findOne);
router.get("/", findAll);
router.delete("/:id", removeById);

module.exports = router;
