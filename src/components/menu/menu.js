import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';

const createMenuTemplate = (title = 'NO TITLE') => `
  <section class="main__control control container">
    <h1 class="control__title">${title}</h1>
    <button class="control__button">+ ADD NEW TASK</button>
  </section>
  `;

export class Menu extends AbstractUiComponent {

  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createMenuTemplate(this._title);
  }

  onAddNewTask() {
    const $addNewTaskBtn = this.getElement().getElementsByClassName('control__button')[0];
    $addNewTaskBtn.addEventListener('click', () => { console.log('click add new task'); });
  }

}


