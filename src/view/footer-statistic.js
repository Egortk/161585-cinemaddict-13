import AbstractView from "./abstract.js";

const createFooterStatisticTemplate = (totalFilms) => {
  return `<section class="footer__statistics">
    <p>${totalFilms} movies inside</p>
  </section>`;
};

export default class FooterStatistic extends AbstractView{
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }
};
