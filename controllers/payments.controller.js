const { sendErrorResponse } = require("../helpers/send_error_res");
const Admins = require("../models/admin.models");
const Bookings = require("../models/order.model");
const Clients = require("../models/clients.model");
const Payment = require("../models/payments.model");

const add = async (req, res) => {
  try {
    const { error, value } = clientsValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const client = Clients.findByPk(value.clientId);
    const booking = Bookings.findByPk(value.bookingId);
    const admin = Admins.findByPk(value.adminId);
    if (!client) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    if (!booking) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    if (!admin) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    const newpayment = await Payment.create({
      ...value,
    });
    res.status(201).send({ message: "Yangi payment qoshildi", newpayment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Bookings,
        },
        {
          model: Clients,
        },
        {
          model: Admins,
        },
      ],
    });

    res.status(200).send(payments);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;Pa
    const newPayment = await Payment.findById(id);
    res.status(200).send(newClientServiceEmployee);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const payment = await Payment.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Payment updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const payment = await Payment.destroy({ where: { id } });
    res.status(200).send({ message: "payment deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
