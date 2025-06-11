const { sendErrorResponse } = require("../../helpers/send_error_res");
const Client = require("../../models/clients.model");

module.exports = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "client") {
      return sendErrorResponse(
        { message: "Access denied. Client rights required." },
        res,
        403
      );
    }

    const client = await Client.findByPk(id);
    if (!client) {
      return sendErrorResponse({ message: "Client not found" }, res, 404);
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
