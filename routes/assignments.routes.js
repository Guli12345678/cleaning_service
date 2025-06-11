const {
  add,
  findAll,
  updateById,
  removeById,
} = require("../controllers/assignments.controller");

const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/", findAll);
router.delete("/:id", removeById);

module.exports = router;
