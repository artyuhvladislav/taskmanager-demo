import { DEFAULT_COLOR, MONTHS } from '../../const';

export const createTaskTemplate = (options) => {
  const { description, color, isFavorite, isArchive, repeatingDays, dueDate } = options;

  const date = `${dueDate?.date.getDate()} ${MONTHS[dueDate?.date.getMonth()]}`;
  const isExpired = dueDate.date < Date.now();
  const cardDeadline = isExpired ? 'card--deadline' : '';
  const cardRepeat = repeatingDays ? 'card--repeat' : '';
  const cardColor = color ?? DEFAULT_COLOR;
  const cardClass = `card card--${cardColor} ${cardRepeat} ${cardDeadline}`;

  const cardFavoriteClass = isFavorite ? '' : 'card__btn--disabled';
  const cardArchiveClass = isArchive ? '' : 'card__btn--disabled';


  return `
    <article class="${cardClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${cardArchiveClass}">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites ${cardFavoriteClass}">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
};