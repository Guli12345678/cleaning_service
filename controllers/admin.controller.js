const { sendErrorResponse } = require("../helpers/send_error_res");
const adminModel = require("../models/admin.models");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("config");
const mailService = require("../services/mail.service");

const add = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingAdmin = await adminModel.findOne({
      where: { email },
    });

    if (existingAdmin) {
      return sendErrorResponse(
        { message: "Admin already exists" },
        res,
        400
      );
    }

    const activation_link = uuid.v4();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      activation_link,
      is_active: false,
    });

    await mailService.sendMail(
      email,
      `${config.get("api_url")}/api/auth/activate/${activation_link}`
    );

    res.status(201).send({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await adminModel.findAll();
    res.status(200).send({ data: admins });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findByPk(id);
    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }
    res.status(200).send({ data: admin });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const admin = await adminModel.findByPk(id);
    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await admin.update(data);
    res.status(200).send({
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const removeById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findByPk(id);
    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }
    await admin.destroy();
    res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  add,
  findAll,
  findOne,
  updateById,
  removeById,
};
