const sequelize = require("../config/db");
const { DataTypes, Association } = require("sequelize");
const Payments = require("../models/payments.model");
const Assignments = require("../models/assignments.model");

const Admins = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    activation_link: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Admins.hasMany(Assignments);
Assignments.belongsTo(Admins);

module.exports = Admins;
