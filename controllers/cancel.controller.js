const { sendErrorResponse } = require("../helpers/send_error_res");
const Cancel = require("../models/cancel.model");
const Clients = require("../models/clients.model");
const Service = require("../models/service.model");

const add = async (req, res) => {
  try {
    const { error, value } = clientsValidation(req.body);
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
    const newcancel = await Cancel.create({
      ...value,
    });
    res.status(201).send({ message: "Yangi cancel qoshildi", newcancel });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const cancels = await Cancel.findAll({
      include: [
        {
          model: Clients,
        },
        {
          model: Service,
        },
      ],
    });

    res.status(200).send(cancels);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newCancel = await Cancel.findByPk(id);
    res.status(200).send(newadmin);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const cancel = await Cancel.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Cancel updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const cancel = await Cancel.destroy({ where: { id } });
    res.status(200).send({ message: "cancel deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
