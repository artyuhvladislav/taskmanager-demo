import { Menu, Filter, Board, LoadButton } from './components';
import { BoardController } from './controllers';
import { task, getFilters } from './mock';
import { render } from './utils';

const $root = document.querySelector('.main');
const tasks = task.generateTasks(20);
const filters = getFilters();

const menuComponent = new Menu('TASKMANAGER');
const filterComponent = new Filter(filters);
const boardComponent = new Board();
const boardController = new BoardController(boardComponent);



render($root, menuComponent);
render(menuComponent, filterComponent, 'afterend');
render($root, boardComponent);

boardController.render(tasks);














