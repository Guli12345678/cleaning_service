const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payments = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card"),
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    payment_status: {
      type: DataTypes.ENUM("completed", "pending", "failed"),
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Payments;
