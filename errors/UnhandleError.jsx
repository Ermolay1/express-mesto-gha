class UnhandleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnhandleError';
    this.statusode = 500;
  }
}

module.exports = UnhandleError;