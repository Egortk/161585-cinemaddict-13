import {isWatchlist, isWatched, isFavorite} from "../utils.js";

const filmToFilterMap = {
  Watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  Watched: (films) => films.filter((film) => film.isWatched).length,
  Favorite: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films)
    };
  });

};
