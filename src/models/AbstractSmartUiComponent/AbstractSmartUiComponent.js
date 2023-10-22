import { AbstractUiComponent } from '../AbstractUiComponent/AbstractUiComponent';

export class AbstractSmartUiComponent extends AbstractUiComponent {
  constructor() {
    super();
    if (new.target === AbstractSmartUiComponent) {
      throw new Error('error: trying to call AbstractSmartUiComponent with "new" operator');
    }
  }
  recoveryListeners() {
    throw new Error('recoveryListeners method has not implemented');
  }
  rerender() {
    debugger;
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parentElement.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }
} 