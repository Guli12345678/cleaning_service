const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Bookings = require("./order.model");

const Status = sequelize.define(
  "status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Status.hasMany(Bookings);
Bookings.belongsTo(Status);

module.exports = Status;
