import { elements } from './base';

export const getQuery = () => elements.searchInput.value;
export const removeQuery = () => {
  elements.searchInput.value = '';
};
export const removeResult = () => {
  elements.searchResList.innerHTML = '';
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
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
