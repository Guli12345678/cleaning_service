const { sendErrorResponse } = require("../../helpers/send_error_res");
const Owner = require("../../models/owner.model");

module.exports = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "owner") {
      return sendErrorResponse(
        { message: "Access denied. Owner rights required." },
        res,
        403
      );
    }

    const owner = await Owner.findByPk(id);
    if (!owner) {
      return sendErrorResponse({ message: "Owner not found" }, res, 404);
      
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
