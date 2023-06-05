class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusode = 404;
  }
}

module.exports = NotFoundError;