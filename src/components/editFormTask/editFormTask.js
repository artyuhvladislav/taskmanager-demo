import { COLORS } from '../../const';
import { AbstractSmartUiComponent } from '../../models/AbstractSmartUiComponent/AbstractSmartUiComponent';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.min.css';


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

const getRepeatingBarTemplate = (isRepeatingDaysShowed) => {
  return isRepeatingDaysShowed ? `
  <svg width="100%" height="10">
    <use xlink:href="#wave"></use>
  </svg>
  ` : '';
};

const getRepeatingDaysTemplate = (repeatingDays, isRepeatingDaysShowed) => {

  if (!isRepeatingDaysShowed) return '';

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

const getDeadlineDate = (dueDate, isDateShowed) => {
  const date = dayjs(dueDate.date).format('ddd MMM DD YYYY');
  if (!isDateShowed) return '';

  return (
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          autocomplete="off"
          placeholder="${date}"
          name="date"
        />
      </label>
    </fieldset>`
  );
};

const createEditFormTaskTemplate = (task, options = {}) => {
  const { description, dueDate } = task;
  const { isDateShowed, isRepeatingDaysShowed, activeRepeatingDays, activeColor } = options;

  const ableToSubmit = isRepeatingDaysShowed && !Object.values(activeRepeatingDays).some(Boolean);
  const isRepeatingDaysText = isRepeatingDaysShowed ? 'YES' : 'NO';
  const isDeadlineText = isDateShowed ? 'YES' : 'NO';

  return (
    `<article class="card card--edit card--${activeColor}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            ${getRepeatingBarTemplate(isRepeatingDaysShowed)}            
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
                ${getDeadlineDate(dueDate, isDateShowed)}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingDaysText}</span>
                </button>
                ${getRepeatingDaysTemplate(activeRepeatingDays, isRepeatingDaysShowed)}
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${getColorsTemplate(activeColor)}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="button" ${!ableToSubmit ? '' : 'disabled'}>save</button>
            <button class="card__delete" type="button">cancel</button>
          </div>
        </div>
      </form>
   </article>
  `
  );
};

export class EditFormTask extends AbstractSmartUiComponent {

  constructor(task) {
    super();
    this._task = task;
    this._activeColor = this._task.color;
    this._isDateShowed = !!this._task.dueDate;
    this._isRepeatingDaysShowed = Object.values(this._task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, this._task.repeatingDays);
    this._submitHandler = null;
    this._flatpickr = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();

  }

  getTemplate() {
    const options = {
      isRepeatingDaysShowed: this._isRepeatingDaysShowed,
      isDateShowed: this._isDateShowed,
      activeRepeatingDays: this._activeRepeatingDays,
      activeColor: this._activeColor,
      ableToSubmit: this._ableToSubmit,
    };
    return createEditFormTaskTemplate(this._task, options);
  }

  recoveryListeners() {
    this.setOnSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  setOnSubmitHandler(handler) {
    const $submitBtn = this.getElement().querySelector('.card__save');
    $submitBtn.addEventListener('click', handler);
    this._submitHandler = handler;
  }

  reset() {
    const task = this._task;
    this._isDateShowed = !!task.dueDate;
    this._isRepeatingDaysShowed = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;
    this.rerender();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowed) {
      const $dateElement = this.getElement().querySelector('.card__date');
      this._flatpickr = flatpickr($dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate.date || 'today',
        onClose: (selectedDate) => {
          this._task.dueDate.date = selectedDate;
          this.rerender();
        }
      });
    }
  }

  _subscribeOnEvents() {
    const $element = this.getElement();

    const $dataToggleBtn = $element.querySelector('.card__date-deadline-toggle');
    $dataToggleBtn.addEventListener('click', () => {
      this._isDateShowed = !this._isDateShowed;
      this.rerender();
    });

    const $repeatDaysToggleBtn = $element.querySelector('.card__repeat-toggle');
    $repeatDaysToggleBtn.addEventListener('click', () => {
      this._isRepeatingDaysShowed = !this._isRepeatingDaysShowed;
      this._activeRepeatingDays = Object.assign({}, this._task.repeatingDays);
      this.rerender();
    });

    const $repeatDaysToggle = $element.querySelector('.card__repeat-days');
    if ($repeatDaysToggle) {
      $repeatDaysToggle.addEventListener('click', (e) => {
        const inputRepeatDay = e.target.closest('.card__repeat-day-input');
        if (inputRepeatDay) {
          this._activeRepeatingDays[inputRepeatDay.value] = e.target.checked;
          this.rerender();
        }
      });
    }

    const $colors = $element.querySelector('.card__colors-wrap');
    $colors.addEventListener('click', (e) => {
      const inputColor = e.target.closest('.card__color-input');
      if (inputColor) {
        this._activeColor = inputColor.value;
        this.rerender();
      }
    });
  }
}
