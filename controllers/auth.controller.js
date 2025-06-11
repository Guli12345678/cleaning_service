const { sendErrorResponse } = require("../helpers/send_error_res");
const clientModel = require("../models/clients.model");
const adminModel = require("../models/admin.models");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const register = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;

    const existingUser = await clientModel.findOne({
      where: { email },
    });

    if (existingUser) {
      return sendErrorResponse(
        { message: "Email already registered" },
        res,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const newUser = await clientModel.create({
      first_name,
      last_name,
      phone_number,
      email,
      hashed_password: hashedPassword,
      activation_link: activationLink,
    });

    await mailService.sendMail(
      email,
      `${config.get("api_url")}/api/auth/activate/${activationLink}`
    );

    const tokens = jwtService.generateTokens({
      id: newUser.id,
      email: newUser.email,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res.status(201).send({
      message: "User registered successfully.",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await clientModel.findOne({
      where: { email },
    });
    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki parol notogri" },
        res,
        400
      );
    }
    // const verifiedPassword = await bcrypt.compare(
    //   password,
    //   user.hashed_password
    // );
    // if (!verifiedPassword) {
    //   return sendErrorResponse(
    //     { message: "Email yoki parol notogri" },
    //     res,
    //     400
    //   );
    // }
    console.log(user);
    const payload = {
      id: user.id,
      email: user.email,
    };

    const tokens = jwtService.generateTokens(payload);

    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refreshToken topilmadi" },
        res,
        400
      );
    }
    const decodedToken = await jwtService.verifyRefreshToken(refreshToken);

    const user = await clientModel.update(
      { hashedToken: null },
      {
        where: { id: decodedToken.id },
        returning: true,
      }
    );
    if (!user) {
      return res.status(400).send({ message: "Token notogri" });
    }
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }
    await jwtService.verifyRefreshToken(refreshToken);

    const admins = await clientModel.findOne({ refresh_token: refreshToken });
    if (!admins) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: clientModel._id,
      email: clientModel.email,
    };

    const tokens = jwtService.generateTokens(payload);
    admins.refresh_token = tokens.refreshToken;
    await admins.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: "tokenlar yangilandi",
      id: adminModel.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const activate = async (req, res) => {
  try {
    const { link } = req.params;

    const admin = await adminModel.findOne({
      where: { activation_link: link },
    });

    if (!admin) {
      return sendErrorResponse(
        { message: "admin link incorrect" },
        res,
        400
      );
    }

    if (admin.is_active) {
      return sendErrorResponse(
        { message: "Admin already activated" },
        res,
        400
      );
    }

    // Update admin status
    await admin.update({
      is_active: true,
      activation_link: null,
    });

    res.send({
      message: "Admin activated successfully",
      is_active: true,
    });
  } catch (error) {
    console.error(error);
    sendErrorResponse({ message: "Serverda xatolik" }, res, 500);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  activate,
};
