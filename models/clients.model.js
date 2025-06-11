const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");



const Clients = sequelize.define(
  "clients",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    activation_link: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);



module.exports = Clients;

const Payments = require("../models/payments.model");
const Assignments = require("../models/assignments.model");
const Order = require("../models/order.model");
const Cancel = require("../models/cancel.model");
const Reviews = require("../models/reviews.model");
const Service = require("./service.model");


Clients.hasMany(Payments);
Payments.belongsTo(Clients);

Clients.hasMany(Order);
Order.belongsTo(Clients);

Clients.hasMany(Assignments);
Assignments.belongsTo(Clients);

Clients.hasMany(Cancel);
Cancel.belongsTo(Clients);

Clients.hasMany(Reviews);
Reviews.belongsTo(Clients);