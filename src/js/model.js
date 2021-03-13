import { API_URL } from './config.js';
import { getJSON } from './helper.js' ;
import { RES_PER_PG } from './config.js';


export const state = {
    recipe: {},
    search: {
        page: 1, //default,
        query: '', //optional
        results: [],
        resultsPerPage: RES_PER_PG
        
    },
    bookmarks: []
}

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`)

    let recipe = data.data.recipe; // {recipe} = data.data
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      time: recipe.cooking_time,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    //console.log(recipe);
  } catch (error) {
    console.error(`x*Y*Y*Y*x ${error} x*Y*Y*Y*x`);
    throw error;
  }
};

export const loadSearchResults = async function (query){
    try{

        state.search.query = query; //optional
        const data = await getJSON(`${API_URL}?search=${query}`);
        //console.log(data)

        state.search.results = data.data.recipes.map(recipe => {
          return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url
          };
        });

        state.search.page = 1; //to reset on evry search to start frm pg 1
        //console.log(state.search.results)
        //console.log(results)
    }catch(err){
        console.error(`x*S*S*S*x ${err} x*S*S*S*x`);
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach( ing => {
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    } )
    state.recipe.servings = newServings;
}  

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  //MARK CURRENT RECIPE AS BOOKMARK
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();