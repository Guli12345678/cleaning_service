const router = require("express").Router();

const clientRouter = require("./clients.routes");
const reviewRouter = require("./reviews.routes");
const orderRouter = require("./order.routes");
const adminRouter = require("./admin.routes");
const employeeRouter = require("./employee.routes");
const paymentRouter = require("./payments.routes");
const ownerRouter = require("./owners.routes");
const statusRouter = require("./status.routes");
const assignmenRouter = require("./assignments.routes");
const serviceRouter = require("./service.routes");
const cancelRouter = require("./cancel.routes");
const client_service_employeeRouter = require("./clientServiceEmployee.routes");
const authRouter = require("./auth.routes");
const aqqliSorovRouter = require("./aqqliSorov.routes");

router.use("/auth", authRouter);
router.use("/clients", clientRouter);
router.use("/reviews", reviewRouter);
router.use("/orders", orderRouter);
router.use("/admin", adminRouter);
router.use("/employee", employeeRouter);
router.use("/payments", paymentRouter);
router.use("/owners", ownerRouter);
router.use("/status", statusRouter);
router.use("/assignments", assignmenRouter);
router.use("/service", serviceRouter);
router.use("/cancel", cancelRouter);
router.use("/client_service_employee", client_service_employeeRouter);
router.use("/aqqlisorov", aqqliSorovRouter);

module.exports = router;
