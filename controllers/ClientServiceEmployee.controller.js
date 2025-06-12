const { sendErrorResponse } = require("../helpers/send_error_res");
const Clients = require("../models/clients.model");
const ClientServiceEmployee = require("../models/ClientServiceEmployee.model");
const Employee = require("../models/employee.model");
const Order = require("../models/order.model");
const {
  ClientServiceEmployeeValidation,
} = require("../validations/ClientServiceEmployee.validation");

const add = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = ClientServiceEmployeeValidation(data);
    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const client = Clients.findByPk(value.clientId);
    const employee = Employee.findByPk(value.employeeId);
    if (!client) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    if (!employee) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    const neworder = await ClientServiceEmployee.create({ ...value });
    res.status(201).send({ message: "Yangi order qoshildi", neworder });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Employee,
        },
        {
          model: Clients,
        },
      ],
    });

    res.status(200).send(orders);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newClientServiceEmployee = await ClientServiceEmployee.findByPk(id);
    res.status(200).send(newClientServiceEmployee);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const order = await Order.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Order updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const order = await Order.destroy({ where: { id } });
    res.status(200).send({ message: "order deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll, findOne, updateById, removeById };
