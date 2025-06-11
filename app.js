// Maxsus texnika loyihasida Machine va MachineImages tablelariga CRUD yozish. Video ozirida tushuntirilgan

const express = require("express");
const config = require("config");
const PORT = config.get("port");
const sequelizes = require("./config/db");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const errorHandlingMiddleware = require("./middleware/errors/error-handling.middleware");
const logger = require("./config/logger");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

app.use("/api", indexRouter);

app.use(errorHandlingMiddleware);

async function start() {
  try {
    await sequelizes.authenticate();
    await sequelizes.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Serverda xatolik:", error);
  }
}
start();
