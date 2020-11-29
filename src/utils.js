export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const watchlist = (isWatchlist) => {
  return isWatchlist ? `film-card__controls-item--active` : ``;
};
export const watched = (isWatched) => {
  return isWatched ? `film-card__controls-item--active` : ``;
};
export const favorite = (isFavorite) => {
  return isFavorite ? `film-card__controls-item--active` : ``;
};
