const sequelize = require("../config/db");

const first = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .send({ error: "Both startDate and endDate must be provided" });
    }

    const result = await sequelize.query(
      `
      SELECT s.name, COUNT(*) as service_count
      FROM service s
      JOIN "order" o ON s.id=o."serviceId"
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
    const { startDate, endDate } = req.body;
    const [result] = await sequelize.query(
      `
      SELECT DISTINCT c.full_name,c.phone
      FROM clients c
      JOIN "order" o ON c.id = o."clientId"
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
    const { startDate, endDate } = req.body;
    const [result] = await sequelize.query(
      `
      SELECT DISTINCT c.full_name, c.phone
      FROM clients c
      JOIN status s ON s.id = c.id
      JOIN "order" o ON s.id = o."statusId"
      WHERE o.created_at BETWEEN :startDate AND :endDate
      AND o."statusId" = 4;
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
    const { serviceName } = req.body;
    const [result] = await sequelize.query(
      `
      SELECT o.name, o.phone, COUNT(*) as service_count
      FROM owners o
      JOIN "order" ord ON o.id = ord.id
      JOIN service s ON s.id = ord."serviceId"
      WHERE s.name = :serviceName
      GROUP BY o.id, o.name, o.phone
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
    const { clientId } = req.body;
    const [result] = await sequelize.query(
      `
      SELECT p.amount, p.payment_method, s.name as service_name, 
             o.name as owner_name, o.phone as owner_phone
      FROM payments p
      JOIN "order" ord ON p."orderId" = ord.id
      JOIN service s ON ord."serviceId" = s.id
      JOIN owners o ON ord.id = o.id
      WHERE ord."clientId" = :clientId;
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
