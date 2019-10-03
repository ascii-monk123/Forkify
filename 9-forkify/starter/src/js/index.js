import Search from './modals/Search';

//This is the global state of our app
//1>Search object
//2>Current recipe object
//3>Shopping list object
//4>Like recipe object
const state = {};

const controlSearch = async () => {
  //1>Get the query from view controller
  const query = 'pizza'; //will be stored in this query
  if (query) {
    //2>New Search object and add it to state
    state.search = new Search(query);

    //3>Prepare the user interface(loading spinner etc)

    //4>Search or recipes
    await state.search.getData(); //it waits for the promise to fulfill and then only the next line can execute

    //5>Render the results on the UI
    console.log(state.search.result);
  }
};
document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
