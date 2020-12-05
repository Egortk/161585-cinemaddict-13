import AbstractView from "./abstract.js";

const createExtraFilmsTemplate = (title) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
  </section>`;
};

export default class ExtraFilms extends AbstractView{
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._title);
  }
};
