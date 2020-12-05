import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a
      href="#watchlist"
      class="main-navigation__item">
      ${name}
      <span
        class="main-navigation__item-count">
        ${count}
      </span>
    </a>`
  );
};

const createMainNavigaionTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join(``);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a
        href="#all"
        class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractView{
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigaionTemplate(this._filters);
  }
};
