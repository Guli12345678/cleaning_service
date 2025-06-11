const { sendErrorResponse } = require("../helpers/send_error_res");
const assignmentModel = require("../models/assignments.model");
const {
  assignmentsValidation,
} = require("../validations/assignment.validation");
const Admin = require("../models/admin.models");
const Clients = require("../models/clients.model");
const Service = require("../models/service.model");

const add = async (req, res) => {
  try {
    const { error, value } = assignmentsValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res, 400);
    }
    const client = Clients.findByPk(value.clientId);
    const admin = Admin.findByPk(value.adminId);
    const service = Service.findByPk(value.serviceId);
    if (!client) {
      sendErrorResponse({ message: "Bunday client mavjud emas" }, res, 400);
    }
    if (!admin) {
      sendErrorResponse({ message: "Bunday admin mavjud emas" }, res, 400);
    }
    if (!service) {
      sendErrorResponse({ message: "Bunday service mavjud emas" }, res, 400);
    }
    const newassignment = await assignmentModel.create({
      ...value,
    });
    res
      .status(201)
      .send({ message: "Yangi assignment qoshildi", newassignment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const assignments = await assignmentModel.findAll({
      include: [
        {
          model: Admin,
        },
        {
          model: Clients,
        },
        {
          model: Service,
        },
      ],
    });

    res.status(200).send(assignments);
  } catch (error) {
    console.log("Err: ", error);
  }
};
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newassignment = await assignmentModel.findById(id);
    res.status(200).send(newadmin);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const updateById = async (req, res) => {
  try {
    const assignment = await assignmentModel.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "assignment updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const assignment = await assignmentModel.destroy({ where: { id } });
    res.status(200).send({ message: "assignment deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll, findOne, updateById, removeById };
