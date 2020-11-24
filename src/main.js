import {createMainNavigaionTemplate} from "./view/main-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsTemplate} from "./view/films.js";
import {createExtraFilmsTemplate} from "./view/extra-films.js";
import {headerProfile} from "./view/header-profile.js";
import {futerStatistic} from "./view/futer-statistic.js";

const TEMP_FILM_COUNT = 5;
const TEMP_EXTRA_FILM_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, headerProfile(), `beforeend`);
render(siteFooter, futerStatistic(), `beforeend`);
render(siteMainElement, createMainNavigaionTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const siteFilmsContainer = siteMainElement.querySelector(`.films`);
const siteFilmsListContainer = siteMainElement.querySelector(`.films-list`).querySelector(`.films-list__container`);

render(siteFilmsContainer, createExtraFilmsTemplate(`Top rated`), `beforeend`);
render(siteFilmsContainer, createExtraFilmsTemplate(`Most commented`), `beforeend`);

const siteExtraFilmsListContainer = siteFilmsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0 ; i < TEMP_FILM_COUNT; i++) {
  render(siteFilmsListContainer, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  render(siteExtraFilmsListContainer[0].querySelector(`.films-list__container`), createFilmCardTemplate(), `beforeend`);
}

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  render(siteExtraFilmsListContainer[1].querySelector(`.films-list__container`), createFilmCardTemplate(), `beforeend`);
}
