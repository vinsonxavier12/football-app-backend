// Wrote this class for .stack property to be displayed
// Error.capture....Trace() will add .stack to the object
// Which is then used on Error handler
class AppError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
