const { sequelize } = require("../config/db");

const first = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [result] = await sequelize.query(
      `
      SELECT s.name, COUNT(*) as service_count
      FROM services s
      JOIN orders o ON s.id = o.service_id
      WHERE o.created_at BETWEEN :startDate AND :endDate
      GROUP BY s.name
      ORDER BY service_count DESC;
      `,
      {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const second = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [result] = await sequelize.query(
      `
      SELECT DISTINCT c.first_name, c.last_name, c.phone_number
      FROM clients c
      JOIN orders o ON c.id = o.client_id
      WHERE o.created_at BETWEEN :startDate AND :endDate;
      `,
      {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const third = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [result] = await sequelize.query(
      `
      SELECT DISTINCT c.first_name, c.last_name, c.phone_number
      FROM clients c
      JOIN cancels cn ON c.id = cn.client_id
      WHERE cn.created_at BETWEEN :startDate AND :endDate;
      `,
      {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const fourth = async (req, res) => {
  try {
    const { serviceName } = req.query;
    const [result] = await sequelize.query(
      `
      SELECT o.first_name, o.last_name, COUNT(*) as service_count
      FROM owners o
      JOIN orders ord ON o.id = ord.owner_id
      JOIN services s ON s.id = ord.service_id
      WHERE s.name = :serviceName
      GROUP BY o.id, o.first_name, o.last_name
      ORDER BY service_count DESC;
      `,
      {
        replacements: { serviceName },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const fifth = async (req, res) => {
  try {
    const { clientId } = req.params;
    const [result] = await sequelize.query(
      `
      SELECT p.amount, p.payment_type, s.name as service_name, 
             o.first_name as owner_name, o.phone_number as owner_phone
      FROM payments p
      JOIN orders ord ON p.order_id = ord.id
      JOIN services s ON ord.service_id = s.id
      JOIN owners o ON ord.owner_id = o.id
      WHERE ord.client_id = :clientId;
      `,
      {
        replacements: { clientId },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  first,
  second,
  third,
  fourth,
  fifth,
};
