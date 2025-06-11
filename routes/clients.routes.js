const {
  add,
  updateById,
  removeById,
  findAll,
  findOne,
} = require("../controllers/clients.controller");
const authGuard = require("../middleware/guards/auth.guard");
const clientJwtGuard = require("../middleware/guards/client-jwt.guard");
const clientSelfGuard = require("../middleware/guards/client-self.guard");

const router = require("express").Router();

router.post("/", add);
router.get("/:id", clientJwtGuard, clientSelfGuard, findOne);
router.get("/", findAll);
router.patch("/:id", updateById);
router.delete("/:id", removeById);

module.exports = router;
