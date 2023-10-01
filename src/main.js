import { menu, filter, board, tasksList, task, addEditTask, sort, loadButton } from './components';
import { COLORS, SHOW_ITEMS_ON_LOAD_MORE } from './const';
import { TemplateError } from './errors';
import { getFilterData, getTasksData } from './mock';

const tasksData = getTasksData.generateTasksData(20);
const filterData = getFilterData();
let showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;

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
const $mainControl = document.querySelector('.main__control');
render($mainControl, filter(filterData), 'afterend');
render($root, board());
const $board = document.querySelector('.board');
render($board, sort(), 'afterbegin');
render($board, tasksList());
const $boardTasksList = document.querySelector('.board__tasks');



const renderTasks = (tasks) => {
  tasks.forEach((options) => {
    render($boardTasksList, task(options));
  });
};
renderTasks(tasksData.slice(0, showItemsCount));

const $addNewTaskBtn = document.querySelector('.control__button');

const onClickAddNewTask = (e) => {
  const taskDataObj = getTasksData.generateTask();
  const options = Object.assign({}, taskDataObj, { color: COLORS[0] });
  render($boardTasksList, addEditTask(options), 'afterbegin');
};
$addNewTaskBtn.addEventListener('pointerdown', onClickAddNewTask);

render($root, loadButton());
const $loadMoreBtn = document.querySelector('.load-more');
const onClickLoadMore = () => {
  let prevCountItems = showItemsCount;
  showItemsCount += SHOW_ITEMS_ON_LOAD_MORE;
  const currentTaskData = tasksData.slice(prevCountItems, showItemsCount);
  renderTasks(currentTaskData);
  if (showItemsCount >= tasksData.length) $loadMoreBtn.remove();
};

$loadMoreBtn.addEventListener('click', onClickLoadMore);




