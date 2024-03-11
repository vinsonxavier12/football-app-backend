module.exports = (error, req, res, next) => {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    stack: error.stack,
  });
};
