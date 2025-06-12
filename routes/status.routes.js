const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/:id", findOne);
router.get("/", findAll);
router.patch("/:id", updateById);
router.delete("/:id", removeById);

module.exports = router;
