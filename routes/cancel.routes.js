const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/cancel.controller");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/", findAll);
router.get("/", findOne);
router.delete("/:id", removeById);

module.exports = router;
