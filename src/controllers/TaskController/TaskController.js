import { Task, EditFormTask } from '../../components';
import { render, replace } from '../../utils';

const MODE = {
  default: 'default',
  edit: 'edit',
};

export class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._taskComponent = null;
    this._editTaskComponent = null;
    this._mode = MODE.default;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _onEscKeyDown(e) {
    const isEscKey = e.key === 'Escape' || e.key === 'Esc';
    if (isEscKey) {
      this._replaceEditTaskToTask();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _replaceTaskToEditTask() {
    this._onViewChange();
    replace(this._editTaskComponent, this._taskComponent);
  }

  _replaceEditTaskToTask() {
    document.removeEventListener('keydown', this._onEscKeyDown);
    this._editTaskComponent.reset();
    replace(this._taskComponent, this._editTaskComponent);
    this._mode = MODE.default;
  }

  setDefaultView() {
    if (this._mode !== MODE.default) {
      this._replaceEditTaskToTask();
    }
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldEditTaskComponent = this._editTaskComponent;



    this._taskComponent = new Task(task);
    this._editTaskComponent = new EditFormTask(task);


    this._taskComponent.setOnClickHandler(() => {
      this._replaceTaskToEditTask();
      this._mode = MODE.edit;
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._editTaskComponent.setOnSubmitHandler((e) => {
      e.preventDefault();
      this._replaceEditTaskToTask();
      document.removeEventListener('keydown', this._onEscKeyDown);
    });

    this._taskComponent.setOnClickFavoritesHandler(() => {
      const newTask = Object.assign({}, task, { isFavorite: !task.isFavorite });
      this._onDataChange(task, newTask);
    });

    this._taskComponent.setOnClickArchiveHandler(() => {
      const newTask = Object.assign({}, task, { isArchive: !task.isArchive });
      this._onDataChange(task, newTask);
    });


    if (oldEditTaskComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._editTaskComponent, oldEditTaskComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }
}