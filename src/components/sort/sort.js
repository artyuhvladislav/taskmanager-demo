import { SortType } from '../../const';
import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';


const createSortTemplate = () => `
  <div class="board__sort-list">
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
  </div>
  `;


export class Sort extends AbstractUiComponent {

  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeHandler(cb) {
    this.getElement().addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        return;
      }
      const sortType = e.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }
      this._currentSortType = sortType;
      cb(this._currentSortType);
    });

  }

}

