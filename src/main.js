import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";

import {render, RenderPosition} from "./utils.js";

import MainNavigationView from "./view/main-navigation.js";
import SortFilmsView from "./view/sort.js";
import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import ExtraFilmsView from "./view/extra-films.js";
import FilmCardView from "./view/film-card.js";
import HeaderProfileView from "./view/header-profile.js";
import FooterStatisticView from "./view/footer-statistic.js";
import FilmDetailsView from "./view/film-details.js";
import ButtonShowMoreView from "./view/button-show-more.js";
import NoFilmsView from "./view/no-films.js";

const TEMP_FILM_COUNT = 32;
const FILM_COUNT_PRE_STEP = 5;
const TEMP_EXTRA_FILM_COUNT = 2;

const films = new Array(TEMP_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteHeader = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);

const sortFilmsElement = new SortFilmsView();
render(siteMainElement, sortFilmsElement.getElement(), RenderPosition.BEFOREEND);

const filmsComponents = new FilmsView();
render(siteMainElement, filmsComponents.getElement(), RenderPosition.BEFOREEND);

const filmsListComponents = new FilmsListView();
render(filmsComponents.getElement(), filmsListComponents.getElement(), RenderPosition.BEFOREEND);

const filmsListContainerComponents = new FilmsListContainerView();
render(filmsListComponents.getElement(), filmsListContainerComponents.getElement(), RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      siteMainElement.removeChild(filmDetailsComponent.getElement());
      document.querySelector(`body`).classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openFilmDetails = () => {
    siteMainElement.appendChild(filmDetailsComponent.getElement());
    document.querySelector(`body`).classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyDown);
    filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      document.querySelector(`body`).classList.remove(`hide-overflow`);
      siteMainElement.removeChild(filmDetailsComponent.getElement());
    });
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, openFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, openFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, openFilmDetails);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmsRender = (films) => {
  if (films.length === 0) {
    render(filmsListContainerComponents.getElement(), new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
    sortFilmsElement.getElement().remove();
    sortFilmsElement.removeElement();
  } else {
    for (let i = 0 ; i < Math.min(films.length, FILM_COUNT_PRE_STEP); i++) {
      renderFilm(filmsListContainerComponents.getElement(), films[i]);
    }
    if (films.length > FILM_COUNT_PRE_STEP) {
      let renderedFilmCount = FILM_COUNT_PRE_STEP;

      const loadMoreButtonComponent = new ButtonShowMoreView();
      render(filmsListComponents.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        films
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PRE_STEP)
          .forEach((films) => renderFilm(filmsListContainerComponents.getElement(), films));
        renderedFilmCount += FILM_COUNT_PRE_STEP;

        if (renderedFilmCount >= films.length) {
          loadMoreButtonComponent.getElement().remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    }
  }
};

const renderExtraFilms = (title) => {
  const extraFilmsComponents = new ExtraFilmsView(title);
  render(filmsComponents.getElement(), extraFilmsComponents.getElement(), RenderPosition.BEFOREEND);
  const extraFilmsListComponents = new FilmsListContainerView();
  render(extraFilmsComponents.getElement(), extraFilmsListComponents.getElement(), RenderPosition.BEFOREEND);
  for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
    renderFilm(extraFilmsListComponents.getElement(), films[i]);
  }
};

filmsRender(films);
renderExtraFilms(`Top rated`);
renderExtraFilms(`Most commented`);

render(siteFooter, new FooterStatisticView(films.length).getElement(), RenderPosition.BEFOREEND);
