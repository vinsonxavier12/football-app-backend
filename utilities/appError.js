class AppError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
