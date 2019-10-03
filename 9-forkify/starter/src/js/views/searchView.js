import { elements } from './base';

export const getQuery = () => elements.searchInput.value;
export const removeQuery = () => {
  elements.searchInput.value = '';
};
export const removeResult = () => {
  elements.searchResList.innerHTML = '';
};
const renderRecipe = recipe => {
  const markup = `
        <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
      </li>
   `;
  console.log(recipe);
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
