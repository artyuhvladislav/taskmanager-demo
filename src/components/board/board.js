import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';

const createBoardTemplate = () => `
  <section class="board container"></section>
  `;

export class Board extends AbstractUiComponent {

  getTemplate() {
    return createBoardTemplate();
  }

}