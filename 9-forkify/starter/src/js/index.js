import Search from './modals/Search';
import Recipe from './modals/Recipe';
import List from './modals/List';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Likes from './modals/Likes';

//This is the global state of our app
//1>Search object
//2>Current recipe object
//3>Shopping list object
//4>Like recipe object
const state = {};
window.state = state;
/**
 * Search
 * Controller */
const controlSearch = async () => {
  //1>Get the query from view controller
  const query = searchView.getQuery(); //will be stored in this query
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
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    //Highlight the selected search icon
    if (state.search) {
      searchView.highlightSelected(id);
    }
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
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      console.log(err);
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

/*
 *LIST CONTROLLER
 */
const controlList = () => {
  //Create new List if one isn't present
  if (!state.list) {
    state.list = new List();
  }
  //Add each ingredient to the list
  state.recipe.ingredients.forEach(ele => {
    const item = state.list.addItem(ele.count, ele.unit, ele.ingredient);
    //Add the element to the UI
    listView.renderItem(item);
  });
};

//Handle delete and update list items events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  //handle the delete event
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    //Delete from state
    state.list.deleteItem(id);
    //delete from the UI
    listView.deleteItem(id);
  } //Handle the count update
  else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value);
    state.list.updateCount(id, val);
  }
});

/*
 *Like CONTROLLER
 */

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  //User has NOT yet liked the current recipe
  if (!state.likes.isLiked(currentID)) {
    //Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    //Toggle the liked button
    likesView.toggleLikeBtn(true);
    //Add like to the UI list
    likesView.renderLike(newLike);
    console.log(state.likes);
    //User has liked the current recipe
  } else {
    //Remove like from the state
    state.likes.deleteLike(currentID);
    //Toggle the liked button
    likesView.toggleLikeBtn(false);
    //Remove like from the UI list
    likesView.deleteLike(currentID);
    console.log(state.likes);
  }
  likesView.toggleLikedMenu(state.likes.getNumLikes());
};

//The increase and decrease button handlers
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease,.btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } //That is the event target matched the buttondecrease or any child element of btn decrease
  else if (e.target.matches('.btn-increase,.btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);

    //Increase button is pressed
  } else if (e.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
    //Add to list button
    controlList();
  } else if (e.target.matches('.recipe__love,.recipe__love *')) {
    //Like Controller
    controlLike();
  }
});

//Handling the reload page event handlers for getting the data out of the localStorage and restore liked recipe on page reloads
window.addEventListener('load', () => {
  //Creating a brand new like object after reload which will have the already liked recipe list
  state.likes = new Likes();
  //Reading the saved likes from the local storage
  state.likes.readStorage();
  //Toggle liked menu button
  likesView.toggleLikedMenu(state.likes.getNumLikes());
  //To render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

//The list controller
//testing
window.l = new List();
