import AbstractView from "./abstract.js";

const createFilmsListCiontainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsListContainer extends AbstractView{
  getTemplate() {
    return createFilmsListCiontainerTemplate();
  }
};
