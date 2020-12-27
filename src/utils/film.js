export const watchlist = (isWatchlist) => {
  return isWatchlist ? `film-card__controls-item--active` : ``;
};
export const watched = (isWatched) => {
  return isWatched ? `film-card__controls-item--active` : ``;
};
export const favorite = (isFavorite) => {
  return isFavorite ? `film-card__controls-item--active` : ``;
};

const getWeightForNullDate = (dateA, dateB) => {
  if (asteA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmA.rating.diff(filmB.rating);
};