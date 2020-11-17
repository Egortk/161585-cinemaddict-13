import {createMainHeader} from "./view/main-header.js";

const render = (container, template, place) => {
  container.insertAdjastmentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteMainHeaderElement = document.querySelector(`.header`);
