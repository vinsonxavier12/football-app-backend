module.exports = (error, req, res, next) => {
  const formattedStack = error.stack.split("\n");
  res.status(error.statusCode || 400).json({
    statusCode: error.statusCode,
    message: error.message,
    stack: formattedStack,
  });
};
