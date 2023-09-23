export class CustomError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}