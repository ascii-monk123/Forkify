import Axios from 'axios';

// Global app controller
//e2e11bf7792a898129b4bbe90d214578//this is the api key
//Search url https://www.food2fork.com/api/search

const getData = async function(query) {
  const key = 'e2e11bf7792a898129b4bbe90d214578';

  const results = await Axios(
    `https://www.food2fork.com/api/search?key=${key}&q=${query}`
  );
  console.log(results.data.recipes);
};
getData('curry');
