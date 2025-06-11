const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Cancel = sequelize.define(
  "cancel",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cancel_date: {
      type: DataTypes.DATE,
    },
    reason: {
      type: DataTypes.STRING,
    },
    refund: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Cancel;
