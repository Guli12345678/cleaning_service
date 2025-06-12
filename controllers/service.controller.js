const { sendErrorResponse } = require("../helpers/send_error_res");
const Service = require("../models/service.model");
const Owners = require("../models/owners.model");
const { servicesValidation } = require("../validations/services.validation");

const add = async (req, res) => {
  try {
    const { error, value } = servicesValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const owner = Owners.findByPk(value.ownerId);
    if (!owner) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    const newservice = await Service.create({
      ...value,
    });
    res.status(201).send({ message: "Yangi service qoshildi", newservice });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: Owners,
        }
      ],
    });

    res.status(200).send(services);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newService = await Service.findByPk(id);
    res.status(200).send(newService);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const service = await Service.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Service updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const service = await Service.destroy({ where: { id } });
    res.status(200).send({ message: "service deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
