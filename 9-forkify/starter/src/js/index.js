import Search from './modals/Search';
import Recipe from './modals/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

//This is the global state of our app
//1>Search object
//2>Current recipe object
//3>Shopping list object
//4>Like recipe object
const state = {};

/**
 * Search
 * Controller */
const controlSearch = async () => {
  //1>Get the query from view controller
  const query = searchView.getQuery(); //will be stored in this query
  console.log(query);
  if (query) {
    //2>New Search object and add it to state
    state.search = new Search(query);

    //3>Prepare the user interface(loading spinner etc)
    searchView.removeQuery();
    searchView.removeResult();
    renderLoader(elements.searchRes);
    try {
      //4>Search or recipes
      await state.search.getData(); //it waits for the promise to fulfill and then only the next line can execute

      //5>Render the results on the UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something wrong with search..');
      clearLoader();
    }
  }
};
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
elements.searchRes.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10);
    searchView.removeResult();
    searchView.renderResults(state.search.result, gotoPage);
  }
});

/**
 * Recipe
 * Controller */
const controlRecipe = async () => {
  //Get the ID from the url
  const id = window.location.hash.replace('#', ''); //The window.location is the entire url and the .hash gives the hash property
  if (id) {
    //Prepare the ui for changes
    //Create a new recipe object
    state.recipe = new Recipe(id);
    try {
      //Get the recipe data
      await state.recipe.getRecipe();
      //parsing the ingredients
      state.recipe.parseIngredients();
      //Calulate the servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe to the user
      console.log(state);
    } catch (err) {
      alert('Error downloading the recipes');
    }
  }
};

//window.addEventListener('hashchange', controlRecipe);
//winddow.addEventListener('load',controlRecipe);

//The better and short method to add multiple event listeners to the same dom element
['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
