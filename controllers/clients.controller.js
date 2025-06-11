const { sendErrorResponse } = require("../helpers/send_error_res");
const Client = require("../models/clients.model");
const { clientsValidation } = require("../validations/clients.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const add = async (req, res) => {
  try {
    const { error, value } = clientsValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const hashed_password = bcrypt.hashSync(value.password, 7);
    const activation_link = await uuid.v4();
    const newClient = await Client.create({
      ...value,
      activation_link,
      password: hashed_password,
    });
    res.status(201).send({ message: "Yangi client qoshildi", newClient });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).send(clients);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newClient = await Client.findById(id);
    res.status(200).send(newClient);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const client = await Client.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Client updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const client = await Client.destroy({ where: { id } });
    res.status(200).send({ message: "client deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll, findOne, updateById, removeById };
