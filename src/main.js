import {
  Menu, Filter, Board, TasksList, Task,
  EditFormTask, Sort,
  LoadButton, EmptyTaskList
} from './components';
import { COLORS, SHOW_ITEMS_ON_LOAD_MORE } from './const';
import { TemplateError } from './errors';
import { task, getFilters } from './mock';

const tasks = task.generateTasks(0);
console.log(tasks);
const filters = getFilters();
let showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;

const menuComponent = new Menu('TASKMANAGER');
const filterComponent = new Filter(filters);
const boardComponent = new Board();
const loadButtonComponent = new LoadButton();


const render = (container, nodeElement, place = 'beforeend') => {
  try {
    if (container) container.insertAdjacentElement(place, nodeElement);
    if (!nodeElement) throw new TemplateError();
  } catch (err) {
    if (err instanceof TemplateError) console.error(err.message);
    throw err;
  }

};

const renderTask = (taskListElement, task) => {

  const taskComponent = new Task(task);
  const editTaskComponent = new EditFormTask(task);

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(editTaskComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), editTaskComponent.getElement());
  };

  const onEscKeyDown = (e) => {
    const isEscKey = e.key === 'Escape' || e.key === 'Esc';
    if (isEscKey) {
      replaceEditToTask();
      $editBtn.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const $editBtn = taskComponent.getElement().querySelector('.card__btn.card__btn--edit');

  $editBtn.addEventListener('click', () => {
    replaceTaskToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editTaskComponent.getElement().querySelector('.card__save').addEventListener('click', (e) => {
    e.preventDefault();
    replaceEditToTask();
    $editBtn.removeEventListener('keydown', onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement());
};

const renderTasks = (taskListComponent, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListComponent.getElement(), task);
  });
};


const $root = document.querySelector('.main');
render($root, menuComponent.getElement());
render(menuComponent.getElement(), filterComponent.getElement(), 'afterend');
render($root, boardComponent.getElement());

const renderBoard = (boardComponent, tasks) => {
  if (tasks.length === 0) {
    const emptyTaskListComponent = new EmptyTaskList();
    render(boardComponent.getElement(), emptyTaskListComponent.getElement());
    return;
  }
  const sortComponent = new Sort();
  const tasksListComponent = new TasksList();

  render(boardComponent.getElement(), sortComponent.getElement());
  render(boardComponent.getElement(), tasksListComponent.getElement());
  renderTasks(tasksListComponent, tasks.slice(0, showItemsCount));
  render($root, loadButtonComponent.getElement());

  const onClickLoadMore = () => {
    let prevCountItems = showItemsCount;
    showItemsCount += SHOW_ITEMS_ON_LOAD_MORE;
    const currentTasks = tasks.slice(prevCountItems, showItemsCount);
    renderTasks(tasksListComponent, currentTasks);
    if (showItemsCount >= tasks.length) {
      loadButtonComponent.getElement().remove();
      loadButtonComponent.removeElement();
    };
  };
  loadButtonComponent.getElement().addEventListener('click', onClickLoadMore);


  // TO DO
  // refactor add new task feature
  // does not work when ---> tasks = [];
  const $addNewTaskBtn = menuComponent.getElement().querySelector('.control__button');

  const onClickAddNewTask = () => {
    const taskDataObj = task.generateSingleTask();
    const taskObj = Object.assign({}, taskDataObj, { color: COLORS[0] });
    const editTaskComponent = new EditFormTask(taskObj);
    render(tasksListComponent.getElement(), editTaskComponent.getElement(), 'afterbegin');
  };
  $addNewTaskBtn.addEventListener('click', onClickAddNewTask);
};

renderBoard(boardComponent, tasks);












