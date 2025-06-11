const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Service = require("./service.model");

const Owners = sequelize.define(
  "owners",
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
    shares: {
      type: DataTypes.STRING,
    },
    join_date: {
      type: DataTypes.DATE,
    },
    activation_link: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Owners.hasMany(Service);
Service.belongsTo(Owners);

module.exports = Owners;
