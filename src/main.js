import { menu, filter, board, tasksList, task, addEditTask, sort, loadButton } from './components';
import { TemplateError } from './errors';

const COUNT_TIMES = 3;

const render = (container, template, place = 'beforeend') => {
  try {
    if (container) container.insertAdjacentHTML(place, template);
    if (!template) throw new TemplateError();
  } catch (err) {
    if (err instanceof TemplateError) console.error(err.message);
    throw err;
  }

};

const $root = document.querySelector('.main');

render($root, menu('TASKMANAGER'));
render($root, filter());
render($root, board());

const $board = document.querySelector('.board');

render($board, sort(), 'afterbegin');
render($board, tasksList());

const $boardTasksList = document.querySelector('.board__tasks');

render($boardTasksList, tasksList());
render($boardTasksList, addEditTask());

for (let i = 0; i < COUNT_TIMES; i++) {
  render($boardTasksList, task());
}

render($root, loadButton());


