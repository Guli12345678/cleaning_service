const { sendErrorResponse } = require("../../helpers/send_error_res");

module.exports = (req, res, next) => {
  try {
    if (!req.admins || !req.admins.is_admin) {
      return sendErrorResponse({ message: "Unauthorized" }, res, 403);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
