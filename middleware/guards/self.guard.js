const { sendErrorResponse } = require("../../helpers/send_error_res");

module.exports = (role) => {
  return async (req, res, next) => {
    try {
      const { id: userId, role: userRole } = req.user;
      const paramId = req.params.id;

      if (userRole === "admin") {
        return next();
      }

      if (userRole !== role) {
        return sendErrorResponse(
          { message: `Access rejected. ${role} required.` },
          res,
          403
        );
      }

      if (userId !== paramId) {
        return sendErrorResponse(
          { message: "Access rejected." },
          res,
          403
        );
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
