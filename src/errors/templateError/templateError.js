import { CustomError } from '../customError/customError';

export class TemplateError extends CustomError {
  constructor(...args) {
    super(...args);
    this.message = 'empty template, please provide html template';
  }
}