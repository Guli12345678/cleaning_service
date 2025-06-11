const ApiError = require("../../errors/ApiError");
const logger = require("../../config/logger");

module.exports = function (err, req, res, next) {
  logger.error("Error:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof ApiError) {
    return res.status(err.status).send({ message: err.message });
  }

  if (err instanceof SyntaxError) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: "Nazarda tutilmagan xatolik" });
};
