class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusode = 400;
  }
}

module.exports = ValidationError;