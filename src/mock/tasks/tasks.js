import { COLORS, repeatingDays } from '../../const';

const getRandomNumber = (upTo) => {
  return Math.round(Math.random() * upTo);
};

export const task = {
  generateSingleTask() {
    return (
      {
        description: 'This is example of task edit. You can set date and chose repeating days and color.',
        color: COLORS[getRandomNumber(COLORS.length - 1)],
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
  },
  generateTasks(length) {
    return new Array(length).fill('').map(this.generateSingleTask);
  }
};



