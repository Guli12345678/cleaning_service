const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Reviews = sequelize.define(
  "reviews",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.SMALLINT,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Reviews;
