import { createElement } from '../../utils';

const createMenuTemplate = (title = 'NO TITLE') => `
  <section class="main__control control container">
    <h1 class="control__title">${title}</h1>
    <button class="control__button">+ ADD NEW TASK</button>
  </section>
  `;

export class Menu {

  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  onAddNewTask() {
    const $addNewTaskBtn = this.getElement().getElementsByClassName('control__button')[0];
    $addNewTaskBtn.addEventListener('click', () => { console.log('click add new task'); });
  }

  removeElement() {
    this._element = null;
  }
}


