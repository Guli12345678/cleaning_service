const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Cancel = require("./cancel.model");
const Assignments = require("./assignments.model");
const Order = require("./order.model");

const Service = sequelize.define(
  "service",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Service.hasMany(Order);
Order.belongsTo(Service);

Service.hasMany(Cancel);
Cancel.belongsTo(Service);

Service.hasMany(Assignments);
Assignments.belongsTo(Service);

module.exports = Service;
