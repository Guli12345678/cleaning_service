const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/ClientServiceEmployee.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", updateById);
router.delete("/:id", removeById);

module.exports = router;
