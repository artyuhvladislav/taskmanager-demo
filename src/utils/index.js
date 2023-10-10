import { SortType } from '../const';
import { TemplateError } from '../errors';
import { AbstractUiComponent } from '../models/AbstractUiComponent/AbstractUiComponent';

const createElement = (template) => {
  const $element = document.createElement('div');
  $element.innerHTML = template;
  return $element.firstElementChild;
};

const render = (container, component, place = 'beforeend') => {
  try {
    if (!component.getElement() || !component) throw new TemplateError();
    if (container instanceof AbstractUiComponent) {
      container.getElement().insertAdjacentElement(place, component.getElement());
    } else {
      container.insertAdjacentElement(place, component.getElement());
    }
  } catch (err) {
    if (err instanceof TemplateError) console.error(err.message);
    throw err;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const oldElement = oldComponent.getElement();
  const newElement = newComponent.getElement();

  const isExistedElements = !!(parentElement && oldElement && newElement);

  if (isExistedElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const getSortedTasks = (sortType, tasks, from, to) => {

  const showingTasks = tasks.slice();
  let sortedTasks = [];

  switch (sortType) {
    case SortType.DATE_UP: {
      sortedTasks = showingTasks.sort((a, b) => a.dueDate.date - b.dueDate.date);
      break;
    }
    case SortType.DATE_DOWN: {
      sortedTasks = showingTasks.sort((a, b) => b.dueDate.date - a.dueDate.date);
      break;
    }
    case SortType.DEFAULT: {
      sortedTasks = showingTasks;
      break;
    }
  }
  return sortedTasks.slice(from, to);
};

export { createElement, render, replace, remove, getSortedTasks };