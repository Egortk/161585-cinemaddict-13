import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";

import {render, RenderPosition} from "./utils/render.js";

import HeaderProfileView from "./view/header-profile.js";
import FooterStatisticView from "./view/footer-statistic.js";

import FilmsBoard from "./presenters/fiml-board.js";

const TEMP_FILM_COUNT = 32;

const films = new Array(TEMP_FILM_COUNT).fill().map(generateFilm);

const siteHeader = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);

render(siteHeader, new HeaderProfileView(), RenderPosition.BEFOREEND);

const filmsBoard = new FilmsBoard(siteMainElement);
filmsBoard.init(films);

render(siteFooter, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
