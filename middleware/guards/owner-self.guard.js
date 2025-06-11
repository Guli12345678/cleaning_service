const { sendErrorResponse } = require("../../helpers/send_error_res");

module.exports = (req, res, next) => {
  try {
    // logics here ->
    if (req.params.id != req.params.id) {
      return res.status(403).send({
        message:
          "Ruxsat etilmagan foydalanuvchi. Faqat shaxsiy ma'lumotlarni korish mumkin",
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
