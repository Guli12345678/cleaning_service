const { sendErrorResponse } = require("../../helpers/send_error_res");

module.exports = (modelName) => {
  return async (req, res, next) => {
    try {
      const { id: userId, role } = req.user;
      const resourceId = req.params.id;

      if (!resourceId) {
        return sendErrorResponse(
          { message: "Resource ID not provided" },
          res,
          400
        );
      }

      const Model = require(`../../models/${modelName}.model`);
      const resource = await Model.findByPk(resourceId);

      if (!resource) {
        return sendErrorResponse({ message: "Resource not found" }, res, 404);
      }

      if (role === "admin") {
        return next();
      }

      if (resource.user_id !== userId) {
        return sendErrorResponse(
          {
            message: "Access denied. You are not the creator.",
          },
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
