const { sendErrorResponse } = require("../helpers/send_error_res");
const Review = require("../models/reviews.model");
const Clients = require("../models/clients.model");
const Employee = require("../models/employee.model");

const { reviewsValidation } = require("../validations/reviews.validation");


const add = async (req, res) => {
  try {
    const { error, value } = reviewsValidation(req.body);
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
    const newreview = await Review.create({
      ...value,
    });
    res.status(201).send({ message: "Yangi review qoshildi", newreview });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};
const findAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Clients,
        },
        {
          model: Employee,
        },
      ],
    });

    res.status(200).send(reviews);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newReview = await Review.findById(id);
    res.status(200).send(newReview);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const review = await Review.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send({ message: "Review updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removeById = async (req, res) => {
  try {
    let { id } = req.params;
    const review = await Review.destroy({ where: { id } });
    res.status(200).send({ message: "review deleted succesfully" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { add, findAll,findOne, updateById, removeById };
