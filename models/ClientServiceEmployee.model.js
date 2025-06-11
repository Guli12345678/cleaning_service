const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Employees = require("./employee.model");
const Clients = require("./clients.model");

const ClientServiceEmployee = sequelize.define(
  "client_service_employee",
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Employees.belongsToMany(Clients, { through: ClientServiceEmployee });
Clients.belongsToMany(Employees, { through: ClientServiceEmployee });

ClientServiceEmployee.belongsTo(Employees);
ClientServiceEmployee.belongsTo(Clients);

module.exports = ClientServiceEmployee;
