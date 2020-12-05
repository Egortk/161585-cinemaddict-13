import AbstractView from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

export default class Films extends AbstractView{
  getTemplate() {
    return createFilmsContainerTemplate();
  }
};
