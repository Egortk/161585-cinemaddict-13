import {getRandomInteger} from "../utils.js";
import {generateComments} from "./comments";

const generatePoster = () => {
  const posters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateTitle = () => {
  const titles = [
    `Made For Each Other`,
    `Popeye Meets Sinbad`,
    `Sagebrush Trail`,
    `Santa Claus Conquers The Martians`,
    `The Dance Of Life`,
    `The Great Flamarion`,
    `The Man With The Golden Arm`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateDuration = () => {
  const durations = [
    `1h 30m`,
    `19m`,
    `1h 17m`,
    `1h 59m`,
    `59m`,
    `1h 12m`,
    `1h`
  ];

  const randomIndex = getRandomInteger(0, durations.length - 1);

  return durations[randomIndex];
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `France`,
    `Germany`,
    `Italy`,
    `Canada`
  ];

  const randomIndex = getRandomInteger(1, countries.length - 1);

  return countries[randomIndex];
};

const generateDescription = () => {
  const descriptionModel = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const description = new Set();

  const MAX_DESCRIPTION_SENTANSES = 5;

  for (let i = 0; i < getRandomInteger(1, MAX_DESCRIPTION_SENTANSES); i++) {
    description.add(descriptionModel[getRandomInteger(0, descriptionModel.length)])
  }

  return Array.from(description).join(` `);
};

const generateWriters = () => {
  const writersModel = [
    `Brayden Martinez`,
    `Jacob Stephens`,
    `Riley Meyer`,
    `Bobby Lucas`,
    `Mattie Welch`,
    `Kelly Meyer`,
    `Robin Hawkins`,
  ];

  const writers = new Set();

  for (let i = 1; i < getRandomInteger(1, writersModel.length); i++) {
    writers.add(writersModel[getRandomInteger(0, writersModel.length - 1)]);
  }

  return Array.from(writers).join(`, `);
};

const generateGenres = () => {
  const genresModel = [
    `Drama`,
    `Film-Noir`,
    `Mystery`
  ];

  const genres = new Set();

  for (let i = 1; i < getRandomInteger(1, genresModel.length); i++) {
    genres.add(genresModel[getRandomInteger(0, genresModel.length - 1)]);
  }

  return Array.from(genres);
};

const generateActors = () => {
  const actorsModel = [
    `Brayden Martinez`,
    `Jacob Stephens`,
    `Riley Meyer`,
    `Bobby Lucas`,
    `Mattie Welch`,
    `Kelly Meyer`,
    `Robin Hawkins`
  ];

  const actors = new Set();

  for (let i = 1; i < getRandomInteger(3, actorsModel.length); i++) {
    actors.add(actorsModel[getRandomInteger(0, actorsModel.length - 1)]);
  }

  return Array.from(actors).join(`, `);
};

export const generateFilm = () => {
  return {
    poster: generatePoster(),
    title: generateTitle(),
    rating: getRandomInteger(0, 9) + `.` + getRandomInteger(0, 9),
    year: getRandomInteger(1921, 1982),
    duration: generateDuration(),
    genres: generateGenres(),
    description: generateDescription(),
    commentsCount: getRandomInteger(0, 5),
    comments: generateComments(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    originalTitle: generateTitle(),
    director: `director`,
    writers: generateWriters(),
    actors: generateActors(),
    country: generateCountry(),
    ageRating: getRandomInteger(0, 18),
  };
};
