import {createMainNavigaionTemplate} from "./view/main-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsTemplate} from "./view/films.js";
import {createExtraFilmsTemplate} from "./view/extra-films.js";
import {headerProfile} from "./view/header-profile.js";
import {futerStatistic} from "./view/futer-statistic.js";
import {generateFilm} from "./mock/film.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilter} from "./mock/filters.js";
import {buttonShowMore} from "./view/button-show-more.js";

const TEMP_FILM_COUNT = 28;
const FILM_COUNT_PRE_STEP = 5;
const TEMP_EXTRA_FILM_COUNT = 2;

const films = new Array(TEMP_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, headerProfile(), `beforeend`);
render(siteFooter, futerStatistic(), `beforeend`);
render(siteMainElement, createMainNavigaionTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const siteFilmsContainer = siteMainElement.querySelector(`.films`);
const siteFilmsListContainer = siteMainElement.querySelector(`.films-list`).querySelector(`.films-list__container`);

render(siteFilmsContainer, createExtraFilmsTemplate(`Top rated`), `beforeend`);
render(siteFilmsContainer, createExtraFilmsTemplate(`Most commented`), `beforeend`);

const siteExtraFilmsListContainer = siteFilmsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0 ; i < Math.min(films.length, FILM_COUNT_PRE_STEP); i++) {
  render(siteFilmsListContainer, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PRE_STEP) {
  let renderedFilmCount = FILM_COUNT_PRE_STEP;

  render(siteMainElement.querySelector(`.films-list`), buttonShowMore(), `beforeend`);

  const filmsListShowMore = document.querySelector(`.films-list__show-more`);

  filmsListShowMore.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PRE_STEP)
      .forEach((films) => render(siteFilmsListContainer, createFilmCardTemplate(films), `beforeend`));
    renderedFilmCount += FILM_COUNT_PRE_STEP;

    if (renderedFilmCount >= films.length) {
      filmsListShowMore.remove();
    }
  });
}

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  render(siteExtraFilmsListContainer[0].querySelector(`.films-list__container`), createFilmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  render(siteExtraFilmsListContainer[1].querySelector(`.films-list__container`), createFilmCardTemplate(films[i]), `beforeend`);
}

render(siteFilmsListContainer, createFilmDetailsTemplate(films[0]), `beforeend`);
