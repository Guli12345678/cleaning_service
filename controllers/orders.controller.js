const { sendErrorResponse } = require("../helpers/send_error_res");
const Booking = require("../models/order.model");
const Clients = require("../models/clients.model");
const Service = require("../models/service.model");
const Status = require("../models/status.model");
const {
  ordersValidation,
} = require("../validations/order.validation");

const add = async (req, res) => {
  try {
    const { error, value } = ordersValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const client = Clients.findByPk(value.clientId);
    const service = Service.findByPk(value.serviceId);
    if (!client) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    if (!service) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    const newbooking = await Booking.create({
      ...value,
    });
    res.status(201).send({ message: "Yangi booking qoshildi", newbooking });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Status,
        },
        {
          model: Clients,
        },
        {
          model: Service,
        },
      ],
    });

    res.status(200).send(bookings);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newOrder = await Booking.findById(id);
    res.status(200).send(newOrder);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const booking = await Booking.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Booking updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const booking = await Booking.destroy({ where: { id } });
    res.status(200).send({ message: "booking deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
