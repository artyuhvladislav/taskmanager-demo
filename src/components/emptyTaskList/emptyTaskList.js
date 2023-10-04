import { createElement } from '../../utils';

const createEmptyTaskListTemplate = () => `
    <p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task

        <!--
          Значение отображаемого текста зависит от выбранного фильтра:
            * ALL — Click «ADD NEW TASK» in menu to create your first task;
            * OVERDUE — 'There are no overdue tasks now';
            * TODAY — 'There are no tasks today';
            * FAVORITE — 'There are no favorite tasks now';
            * REPEATING – 'There are no repeating tasks now';
            * ARCHIVE — 'There are no archive tasks now'.
        -->
    </p>
`;

export class EmptyTaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyTaskListTemplate();
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