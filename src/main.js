import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";

import {renderElement, renderTemplate, RenderPosition} from "./utils.js";

import MainNavigation from "./view/main-navigation.js";
import SortFilms from "./view/sort.js";
import Films from "./view/films.js";
import FilmsList from "./view/films-list.js";
import FilmsListContainer from "./view/films-list-container.js";
import ExtraFilms from "./view/extra-films.js";
import FilmCard from "./view/film-card.js";
import HeaderProfile from "./view/header-profile.js";
import FooterStatistic from "./view/footer-statistic.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import ButtonShowMore from "./view/button-show-more.js";

const TEMP_FILM_COUNT = 28;
const FILM_COUNT_PRE_STEP = 5;
const TEMP_EXTRA_FILM_COUNT = 2;

const films = new Array(TEMP_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteHeader = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);

renderElement(siteHeader, new HeaderProfile().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortFilms().getElement(), RenderPosition.BEFOREEND);

const filmsComponents = new Films();
renderElement(siteMainElement, filmsComponents.getElement(), RenderPosition.BEFOREEND);

const filmsListComponents = new FilmsList();
renderElement(filmsComponents.getElement(), filmsListComponents.getElement(), RenderPosition.BEFOREEND);

const filmsListContainerComponents = new FilmsListContainer();
renderElement(filmsListComponents.getElement(), filmsListContainerComponents.getElement(), RenderPosition.BEFOREEND);

for (let i = 0 ; i < Math.min(films.length, FILM_COUNT_PRE_STEP); i++) {
  renderElement(filmsListContainerComponents.getElement(), new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PRE_STEP) {
  let renderedFilmCount = FILM_COUNT_PRE_STEP;

  const loadMoreButtonComponent = new ButtonShowMore();
  renderElement(filmsListComponents.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PRE_STEP)
      .forEach((films) => renderElement(filmsListContainerComponents.getElement(), new FilmCard(films).getElement(), RenderPosition.BEFOREEND));
    renderedFilmCount += FILM_COUNT_PRE_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const topRatedComponents = new ExtraFilms(`Top rated`);
renderElement(filmsComponents.getElement(), topRatedComponents.getElement(), RenderPosition.BEFOREEND);
const topRatedFilmsListComponents = new FilmsListContainer;
renderElement(topRatedComponents.getElement(), topRatedFilmsListComponents.getElement(), RenderPosition.BEFOREEND);

const mostCommentedComponents = new ExtraFilms(`Most commented`);
renderElement(filmsComponents.getElement(), mostCommentedComponents.getElement(), RenderPosition.BEFOREEND);
const mostCommentedFilmsListComponents = new FilmsListContainer();
renderElement(mostCommentedComponents.getElement(), mostCommentedFilmsListComponents.getElement(), RenderPosition.BEFOREEND);

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  renderElement(topRatedFilmsListComponents.getElement(), new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
  renderElement(mostCommentedFilmsListComponents.getElement(), new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(siteFooter, new FooterStatistic(films.length).getElement(), RenderPosition.BEFOREEND);
