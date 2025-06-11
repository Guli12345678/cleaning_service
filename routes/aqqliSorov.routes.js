const router = require("express").Router();
const {
  first,
  second,
  third,
  fourth,
  fifth,
} = require("../controllers/aqqliSorov.controller");

router.get("/fst", first);
router.get("/s", second);
router.get("/t", third);
router.get("/f", fourth);
router.get("/ft", fifth);

module.exports = router;
