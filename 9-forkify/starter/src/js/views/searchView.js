import { elements } from './base';

export const getQuery = () => elements.searchInput.value;
export const removeQuery = () => {
  elements.searchInput.value = '';
};
export const removeResult = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};
export const highlightSelected = id => {
  const everyResult = Array.from(document.querySelectorAll('.results__link'));
  everyResult.forEach(elem => {
    elem.classList.remove('results__link--active');
  });
  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add('results__link--active');
};

//'Pasta with tomato and spinach'
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((accum, cur) => {
      if (accum + cur.length <= limit) {
        newTitle.push(cur);
      }
      return accum + cur.length;
    }, 0);
    //returning the value
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
        <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
      </li>
   `;

  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createBtn = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
</svg>

</button>

`;
const renderButtons = (page, numResults, resPerPage) => {
  //pages is the number of pages in the doc
  let button;
  const pages = Math.ceil(numResults / resPerPage);
  if (page === 1 && pages > 1) {
    //button only for next page
    button = createBtn(page, 'next');
  } else if (page === pages && pages > 1) {
    //button only for previous page
    button = createBtn(page, 'prev');
  } else if (page < pages) {
    //We want both buttons
    button = `
    ${createBtn(page, 'prev')}
    ${createBtn(page, 'next')}
    `;
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  //render pagination  button
  renderButtons(page, recipes.length, resPerPage);
};
