import { createElement } from '../../utils';

const createFilterMarkup = () => {
  return (filter, idx) => {
    const { title, count } = filter;
    const isChecked = idx === 0;
    return (
      `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? null : 'disabled'}
    />
    <label for="filter__${title}" class="filter__label"
      >${title} <span class="filter__${title}-count">${count}</span></label
    >`
    );
  };
};

const createFilterTemplate = (filters) => {
  const filterElements = filters.map(createFilterMarkup()).join('\n');
  return `
    <section class="main__filter filter container">
      ${filterElements}
    </section>
    `;
};

export class Filter {

  constructor(filters) {
    this.filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this.filters);
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