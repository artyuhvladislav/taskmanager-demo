export const createMenuTemplate = (title = 'NO TITLE') => `
  <section class="main__control control container">
    <h1 class="control__title">${title}</h1>
    <button class="control__button">+ ADD NEW TASK</button>
  </section>
  `;