const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Reviews = require("./reviews.model");
const Employees = sequelize.define(
  "employees",
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
    skill: {
      type: DataTypes.STRING,
    },
    hired_date: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


Employees.hasMany(Reviews);
Reviews.belongsTo(Employees);

module.exports = Employees;
