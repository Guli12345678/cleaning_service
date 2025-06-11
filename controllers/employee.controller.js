const { sendErrorResponse } = require("../helpers/send_error_res");
const Employee = require("../models/employee.model");
const { employeesValidation } = require("../validations/employees.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const add = async (req, res) => {
  try {
    const { error, value } = employeesValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const hashed_password = bcrypt.hashSync(value.password, 7);
    const activation_link = await uuid.v4();
    const newemployee = await Employee.create({
      ...value,
      activation_link,
      password: hashed_password,
    });
    const link = `${config.get(
      "api_url"
    )}/api/auth/activate/${activation_link}`;

    await mailService.sendMail(value.email, link);
    res.status(201).send({ message: "Yangi employee qoshildi", newemployee });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    res.status(200).send(employees);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newemployee = await Employee.findById(id);
    res.status(200).send(newClientServiceEmployee);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const employee = await Employee.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Employee updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const employee = await Employee.destroy({ where: { id } });
    res.status(200).send({ message: "employee deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll, findOne, updateById, removeById };
