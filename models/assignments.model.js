const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Assignments = sequelize.define(
  "assignments",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Assignments;
