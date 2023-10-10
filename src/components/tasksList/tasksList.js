import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';

const createTaskListTemplate = () => {
    return (
        `<div class="board__tasks">
        </div>
        `
    );
};

export class TasksList extends AbstractUiComponent {

    getTemplate() {
        return createTaskListTemplate();
    }

}
