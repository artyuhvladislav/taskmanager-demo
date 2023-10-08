const COLORS = ['black', 'yellow', 'blue', 'green', 'pink'];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const DEFAULT_COLOR = 'black';

const SHOW_ITEMS_ON_LOAD_MORE = 8;

const FilterType = {
  ALL: 'all',
  OVERDUE: 'overdue',
  TODAY: 'today',
  FAVORITES: 'favorites',
  REPEATING: 'repeating',
  ARCHIVE: 'archive',
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const repeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

export {
  COLORS,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  repeatingDays,
  MONTHS,
  DEFAULT_COLOR,
  SHOW_ITEMS_ON_LOAD_MORE
};
