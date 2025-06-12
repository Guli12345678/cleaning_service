const {
  add,
  findAll,
  updateById,
  removeById,
  findOne,
} = require("../controllers/service.controller");


const router = require("express").Router();

router.post("/", add);
router.patch("/:id", updateById);
router.get("/:id", findOne);
router.get("/", findAll);
router.delete("/:id", removeById);

module.exports = router;
