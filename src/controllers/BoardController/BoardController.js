import {
  EditFormTask, Task,
  EmptyTaskList,
  Sort, TasksList, LoadButton
} from '../../components';
import { SHOW_ITEMS_ON_LOAD_MORE } from '../../const';
import { render, replace, remove, getSortedTasks } from '../../utils';

export class BoardController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new Sort();
    this._loadButtonComponent = new LoadButton();
    this._tasksListComponent = new TasksList();
    this._emptyTaskListComponent = new EmptyTaskList();
  }

  render(tasks) {
    let showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;

    const renderLoadMoreButton = () => {
      if (showItemsCount >= tasks.length) {
        return;
      }
      render(this._container, this._loadButtonComponent);

      const onClickLoadMoreButton = () => {
        let prevCountItems = showItemsCount;
        showItemsCount += SHOW_ITEMS_ON_LOAD_MORE;
        const currentSortedTasks = getSortedTasks(this._sortComponent.getSortType(), tasks, prevCountItems, showItemsCount);
        renderTasks(this._tasksListComponent, currentSortedTasks);
        if (showItemsCount >= tasks.length) {
          this._loadButtonComponent.removeOnClickHandler(onClickLoadMoreButton);
          remove(this._loadButtonComponent);
        };
      };

      this._loadButtonComponent.setOnClickHandler(onClickLoadMoreButton);
    };

    const renderTask = (taskListComponent, task) => {

      const taskComponent = new Task(task);
      const editTaskComponent = new EditFormTask(task);

      const onEscKeyDown = (e) => {
        const isEscKey = e.key === 'Escape' || e.key === 'Esc';
        if (isEscKey) {
          replace(taskComponent, editTaskComponent);
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };


      taskComponent.setOnClickHandler(() => {
        replace(editTaskComponent, taskComponent);
        document.addEventListener('keydown', onEscKeyDown);
      });

      editTaskComponent.setOnSubmitHandler((e) => {
        e.preventDefault();
        replace(taskComponent, editTaskComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      });

      render(taskListComponent, taskComponent);
    };

    const renderTasks = (taskListComponent, tasks) => {
      tasks.forEach((task) => {
        renderTask(taskListComponent, task);
      });
    };

    const renderBoard = (container, tasks) => {
      if (tasks.length === 0) {
        render(container, this._emptyTaskListComponent);
        return;
      }

      render(container, this._sortComponent);
      render(container, this._tasksListComponent);
      renderTasks(this._tasksListComponent, tasks.slice(0, showItemsCount));
      renderLoadMoreButton();

      this._sortComponent.setSortTypeHandler((sortType) => {
        showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;
        const tasksListElement = this._tasksListComponent.getElement();
        tasksListElement.innerHTML = '';
        const sortedTasks = getSortedTasks(sortType, tasks, 0, showItemsCount);
        renderTasks(this._tasksListComponent, sortedTasks);
        renderLoadMoreButton();
      });
    };

    renderBoard(this._container, tasks);
  }
}