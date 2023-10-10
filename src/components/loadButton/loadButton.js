import { AbstractUiComponent } from '../../models/AbstractUiComponent/AbstractUiComponent';

const createLoadButtonTemplate = () => `
   <button class="load-more" type="button">load more</button>
  `;
export class LoadButton extends AbstractUiComponent {

   getTemplate() {
      return createLoadButtonTemplate();
   }

   setOnClickHandler(cb) {
      this.getElement().addEventListener('click', cb);
   }

   removeOnClickHandler(cb) {
      this.getElement().removeEventListener('click', cb);
   }

}