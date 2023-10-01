import { COLORS, repeatingDays } from '../../const';

const getRandomNumber = (upTo) => {
  return Math.round(Math.random() * upTo);
};

const generateTask = () => (
  {
    description: 'This is example of task edit. You can set date and chose repeating days and color.',
    color: COLORS[getRandomNumber(COLORS.length)],
    dueDate: {
      date: new Date(Date.now() + 10000)
    },
    repeatingDays: Object.assign({}, repeatingDays, {
      'mo': true
    }),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  }
);

const generateTasksData = (length) => {
  return new Array(length).fill('').map(generateTask);
};


export { generateTask, generateTasksData };