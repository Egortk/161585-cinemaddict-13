import {render, RenderPosition} from "../utils/render.js";

import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";

export default class FilmCardPresenter {
    constructor(filmsContainer, changeData) {
        this._bodyContainer = document.querySelector(`body`);
        this._filmsContainer = filmsContainer;
        this._changeData = changeData;

        this._filmComponent = null;
        this._filmDetailsComponent = null;

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
        this._openFilmDetails = this._openFilmDetails.bind(this);
        this._onFilmDetailsComponentOpen = this._onFilmDetailsComponentOpen.bind(this);
        this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
        this._handleWatchedClick = this._handleWatchedClick.bind(this);
        this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    }

    init(film) {
        this._film = film;

        const prevFilmComponent = this._filmComponent;
        const prevfilmDetailsComponent = this._filmDetailsComponent;

        this._filmComponent = new FilmCardView(film);
        this._filmDetailsComponent = new FilmDetailsView(film);

        this._filmComponent.setOpenClickHandler(this._openFilmDetails);
        this._filmComponent.setWatchlistClick(this._handleWatchlistClick);
        this._filmComponent.setWatchedClick(this._handleWatchedClick);
        this._filmComponent.setFavoriteClick(this._handleFavoriteClick);

        if (prevFilmComponent === null || prevfilmDetailsComponent === null) {
            render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
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

    _handleWatchlistClick() {
        this._changeData(
            object.assign(
                {},
                this._film,
                {
                    isWatchlist: !this._film.isWatchlist
                }
            )
        );
    }

    _handleWatchedClick() {
        this._changeData(
            object.assign(
                {},
                this._film,
                {
                    isWatched: !this._film.isWatched
                }
            )
        );
    }

    _handleFavoriteClick() {
        this._changeData(
            object.assign(
                {},
                this._film,
                {
                    isFavorite: !this._film.isFavorite
                }
            )
        );
    }
}