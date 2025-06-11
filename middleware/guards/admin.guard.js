const { sendErrorResponse } = require("../../helpers/send_error_res");
const Admin = require("../../models/admin.models");

module.exports = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") {
      return sendErrorResponse(
        { message: "Access denied. Admin rights required." },
        res,
        403
      );
    }

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
