import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';

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

export class Filter extends AbstractUiComponent {

  constructor(filters) {
    super();
    this.filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this.filters);
  }

}