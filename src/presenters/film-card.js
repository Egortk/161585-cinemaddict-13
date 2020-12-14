import {render, RenderPosition} from "../utils/render.js";

import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";

export default class FilmCardPresenter {
    constructor(filmsContainer) {
        this._bodyContainer = document.querySelector(`body`);
        this._filmsContainer = filmsContainer;

        this._filmComponent = null;
        this._filmDetailsComponent = null;

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
        this._openFilmDetails = this._openFilmDetails.bind(this);
        this._onFilmDetailsComponentOpen = this._onFilmDetailsComponentOpen.bind(this);
    }

    init(filmsContainer, film) {
        this._film = film;

        const prevFilmComponent = this._filmComponent;
        const prevfilmDetailsComponent = this._filmDetailsComponent;

        this._filmComponent = new FilmCardView(film);
        this._filmDetailsComponent = new FilmDetailsView(film);

        this._filmComponent.setClickHandler(this._openFilmDetails);

        //this._showFilmDetails();

        if (prevFilmComponent === null || prevfilmDetailsComponent === null) {
            render(filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
            return;
        }

        remove(prevFilmComponent);
        remove(prevfilmDetailsComponent);
    }

    _showFilmDetails() {
        this._bodyContainer.appendChild(this._filmDetailsComponent.getElement());
    }

    _hideFilmDetails() {
        this._bodyContainer.removeChild(this._filmDetailsComponent.getElement());
    }

    _onEscKeyDown(evt){
        if (evt.key === `Escape` || evt.key === `Esc`) {
            evt.preventDefault();
            this._hideFilmDetails();
            document.querySelector(`body`).classList.remove(`hide-overflow`);
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        }
    }

    _onFilmDetailsComponentOpen() {
        this._hideFilmDetails();
        document.querySelector(`body`).classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
    }

    _openFilmDetails() {
        this._showFilmDetails();
        document.querySelector(`body`).classList.add(`hide-overflow`);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        this._filmDetailsComponent.setClickHandler(this._onFilmDetailsComponentOpen);
    }

    destroy() {
        remove(this._filmComponent);
        remove(this._filmDetailsComponent);
    }
}