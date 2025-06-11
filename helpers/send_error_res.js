const sendErrorResponse = (error, res, status) => {
  console.log(error);
  // console.log(error.details);
  res.status(status).send({ error: error.message });
};

module.exports = {
  sendErrorResponse,
};
