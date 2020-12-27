import {generateFilter} from "../mock/filters.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortRating} from "../utils/film.js";
import {SortType} from "../const.js";

import MainNavigationView from "../view/main-navigation.js";
import SortFilmsView from "../view/sort.js";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import ExtraFilmsView from "../view/extra-films.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import NoFilmsView from "../view/no-films.js";

import FilmCardPresenter from "./film-card.js";



const FILM_COUNT_PRE_STEP = 5;
const TEMP_EXTRA_FILM_COUNT = 2;

export default class FilmsBoard {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;
    this._renderFilmCount = FILM_COUNT_PRE_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponents = new FilmsView();
    this._filmsListComponents = new FilmsListView();
    this._filmsListContainerComponents = new FilmsListContainerView();
    this._buttonShowMoreComponents = new ButtonShowMoreView();
    this._mainNavigationComponent = new MainNavigationView();
    this._sortFilmsComponent = new SortFilmsView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    render(this._siteMainElement, this._filmsComponents, RenderPosition.BEFOREEND);
    render(this._filmsComponents, this._filmsListComponents, RenderPosition.BEFOREEND);
    render(this._filmsListComponents, this._filmsListContainerComponents, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._films.sort(sortRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updateFilm) {
    this._renderFilmsBoard = updateItem(this._films, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
  }

  _renderMainNavigation() {
    const filters = generateFilter(this._films);
    render(this._siteMainElement, new MainNavigationView(filters), RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._siteMainElement, this._sortFilmsComponent, RenderPosition.AFTERBEGIN);
    this._sortFilmsComponent._setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmsContainer, film) {
    const filmPresenter = new FilmCardPresenter(filmsContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilms() {
    render(this._filmsListContainerComponents, new NoFilmsView(), RenderPosition.AFTERBEGIN);
  }

  _renderExtraFilms(title, sortedFilmList) {
    const extraFilmsComponents = new ExtraFilmsView(title);
    render(this._filmsComponents, extraFilmsComponents, RenderPosition.BEFOREEND);
    const extraFilmsListComponents = new FilmsListContainerView();
    render(extraFilmsComponents, extraFilmsListComponents, RenderPosition.BEFOREEND);

    for (let i = 0 ; i < TEMP_EXTRA_FILM_COUNT; i++) {
      this._renderFilm(extraFilmsListComponents, sortedFilmList[i]);
    }
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((films) => this._renderFilm(this._filmsListContainerComponents, films));
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PRE_STEP));

    if (this._films.length > this._renderFilmCount) {
      this._renderLoadMoreButton();
    }
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderFilmCount = FILM_COUNT_PRE_STEP;
    remove(this._buttonShowMoreComponents);
  }

  _handleLoadMoreButtonClick() {
    this._films
      .slice(this._renderFilmCount, this._renderFilmCount + FILM_COUNT_PRE_STEP)
      .forEach((films) => this._renderFilm(this._filmsListContainerComponents, films));
      this._renderFilmCount += FILM_COUNT_PRE_STEP;

    if (this._renderFilmCount >= this._films.length) {
      this._buttonShowMoreComponents.getElement().remove();
      this._buttonShowMoreComponents.removeElement();
    }
  }

  _renderLoadMoreButton () {
    render(this._filmsListComponents, this._buttonShowMoreComponents, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponents.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderExtraFilmsLists() {
    const topRatedFilmsOrder = [...this._films].sort((a, b) => {
      return b.rating - a.rating
    });
    
    const mostCommentedFilmsOrder = [...this._films].sort((a, b) => {
      return b.comments.length - a.comments.length
    });

    this._renderExtraFilms(`Top rated`, topRatedFilmsOrder);
    this._renderExtraFilms(`Most commented`, mostCommentedFilmsOrder);
  }

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderSort();
      this._renderFilmList();
      this._renderExtraFilmsLists();
    }
    this._renderMainNavigation();
  }
}
