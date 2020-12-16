export const watchlist = (isWatchlist) => {
  return isWatchlist ? `film-card__controls-item--active` : ``;
};
export const watched = (isWatched) => {
  return isWatched ? `film-card__controls-item--active` : ``;
};
export const favorite = (isFavorite) => {
  return isFavorite ? `film-card__controls-item--active` : ``;
};

