const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Payments = require("./payments.model");
const ClientServiceEmployee = require("./ClientServiceEmployee.model");
const Assignments = require("./assignments.model");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    total_price: {
      type: DataTypes.DECIMAL,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Order.hasMany(Payments);
Payments.belongsTo(Order);

Order.hasMany(ClientServiceEmployee);
ClientServiceEmployee.belongsTo(Order);

Order.hasMany(Assignments);
Assignments.belongsTo(Order);

module.exports = Order;
