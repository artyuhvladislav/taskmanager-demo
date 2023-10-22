import {
  EditFormTask, Task,
  EmptyTaskList,
  Sort, TasksList, LoadButton
} from '../../components';
import { SHOW_ITEMS_ON_LOAD_MORE } from '../../const';
import { render, replace, remove, getSortedTasks } from '../../utils';
import { TaskController } from '../TaskController/TaskController';

const renderTasks = (taskListComponent, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListComponent, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

export class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._showedTaskControllers = [];
    this._sortComponent = new Sort();
    this._loadButtonComponent = new LoadButton();
    this._tasksListComponent = new TasksList();
    this._emptyTaskListComponent = new EmptyTaskList();
    this._showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  _onDataChange(oldTask, newTask) {
    const index = this._tasks.findIndex((it) => it === oldTask);
    if (index === -1) return;

    this._tasks = [].concat(this._tasks.slice(0, index), newTask, this._tasks.slice(index + 1));
    const newTaskController = this._showedTaskControllers[index];
    newTaskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((controller) => {
      controller.setDefaultView();
    });
  }



  _renderLoadMoreButton() {
    if (this._showItemsCount >= this._tasks.length) {
      this._showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;
      return;
    }
    render(this._container, this._loadButtonComponent);

    this._loadButtonComponent.setOnClickHandler(() => {
      let prevCountItems = this._showItemsCount;
      this._showItemsCount += SHOW_ITEMS_ON_LOAD_MORE;

      const currentSortedTasks = getSortedTasks(
        this._sortComponent.getSortType(),
        this._tasks,
        prevCountItems,
        this._showItemsCount
      );

      const newTaskControllers = renderTasks(
        this._tasksListComponent,
        currentSortedTasks,
        this._onDataChange,
        this._onViewChange
      );

      this._showedTaskControllers = this._showedTaskControllers.concat(newTaskControllers);

      if (this._showItemsCount >= this._tasks.length) {
        remove(this._loadButtonComponent);
      };
    });
  }

  _onSortTypeChange(sortType) {
    this._showItemsCount = SHOW_ITEMS_ON_LOAD_MORE;
    const tasksListElement = this._tasksListComponent.getElement();
    tasksListElement.innerHTML = '';

    const sortedTasks = getSortedTasks(sortType, this._tasks, 0, this._showItemsCount);

    const newTaskControllers = renderTasks(
      this._tasksListComponent,
      sortedTasks,
      this._onDataChange,
      this._onViewChange
    );

    this._showedTaskControllers = newTaskControllers;
    this._renderLoadMoreButton();
  }

  render(tasks) {
    this._tasks = tasks;

    if (this._tasks.length === 0) {
      render(this._container, this._emptyTaskListComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._tasksListComponent);

    const newTaskControllers = renderTasks(
      this._tasksListComponent,
      this._tasks.slice(0, this._showItemsCount),
      this._onDataChange,
      this._onViewChange
    );

    this._showedTaskControllers = this._showedTaskControllers.concat(newTaskControllers);
    this._renderLoadMoreButton();
  }
}