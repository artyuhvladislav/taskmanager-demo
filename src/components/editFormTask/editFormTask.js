import { COLORS } from '../../const';
import { createElement } from '../../utils';


const getColorsTemplate = (taskColor) => {
  return COLORS.map((color, idx) => {

    return `<input
                type="radio"
                id="color-${color}-${idx}"
                class="card__color-input card__color-input--${color} visually-hidden"
                name="color"
                value="${color}"
                ${color === taskColor ? 'checked' : ''}
              />
              <label
                for="color-${color}-${idx}"
                class="card__color card__color--${color}"
                >${color}</label
              >`;
  }).join('\n');
};

const getRepeatingDaysTemplate = (repeatingDays) => {
  if (!repeatingDays) return '';

  const repeatingDaysElements = Object.entries(repeatingDays).map(([key, val], idx) => {
    return `<input
              class="visually-hidden card__repeat-day-input"
              type="checkbox"
              id="repeat-${key}-${idx}"
              name="repeat"
              value="${key}"
              ${val ? 'checked' : ''}
            />
            <label class="card__repeat-day" for="repeat-${key}-${idx}"
              >${key}</label
            >`;
  }).join('\n');

  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${repeatingDaysElements}
      </div>
    </fieldset>`
  );
};

const getDeadlineDate = (dueDate) => {
  if (!dueDate) return '';

  return (
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder="${dueDate?.date}"
          name="date"
        />
      </label>
    </fieldset>`
  );
};

const createEditFormTaskTemplate = (task) => {
  const { description, color, repeatingDays, dueDate } = task;

  const isRepeatingDaysText = !!repeatingDays ? 'YES' : 'NO';
  const isDeadlineText = !!dueDate ? 'YES' : 'NO';

  return (
    `<article class="card card--edit card--${color}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDeadlineText}</span>
                </button>
                ${getDeadlineDate(dueDate)}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingDaysText}</span>
                </button>
                ${getRepeatingDaysTemplate(repeatingDays)}
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${getColorsTemplate(color)}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="button">save</button>
            <button class="card__delete" type="button">cancel</button>
          </div>
        </div>
      </form>
   </article>
  `
  );
};

export class EditFormTask {

  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createEditFormTaskTemplate(this._task);
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
