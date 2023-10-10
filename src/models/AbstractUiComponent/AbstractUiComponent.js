import { createElement } from '../../utils';

export class AbstractUiComponent {
  constructor() {
    if (new.target === AbstractUiComponent) {
      throw new Error('error: trying to call AbstractUiComponent with "new" operator');
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error('getTemplate method is not implemented');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}