import {getRandomInteger} from "../utils/common.js";

const generateEmoji = () => {
  const emojies = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const randomIndex = getRandomInteger(0, emojies.length - 1);

  return emojies[randomIndex];
};

const generateCommentText = () => {
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

const comment = () => {
  return {
    comment: generateCommentText(),
    emoji: generateEmoji(),
    author: `author`,
    date: `date`
  };
};

export const generateComments = () => {
  return new Array(getRandomInteger(0, 9)).fill().map(comment);
};
