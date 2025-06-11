const { sendErrorResponse } = require("../helpers/send_error_res");
const Owner = require("../models/owners.model");
const { ownersValidation } = require("../validations/owner.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const add = async (req, res) => {
  try {
    const { error, value } = ownersValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const hashed_password = bcrypt.hashSync(value.password, 7);
    const activation_link = await uuid.v4();
    const newowner = await Owner.create({
      ...value,
      activation_link,
      password: hashed_password,
    });
    res.status(201).send({ message: "Yangi owner qoshildi", newowner });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const owners = await Owner.findAll();

    res.status(200).send(owners);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newOwner = await Owner.findById(id);
    res.status(200).send(newOwner);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const owner = await Owner.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Owner updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const owner = await Owner.destroy({ where: { id } });
    res.status(200).send({ message: "owner deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
