const {
  add,
  findAll,
  updateById,
  removeById,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/", findAll);
router.patch("/:id", updateById);
router.delete("/:id", removeById);

module.exports = router;
