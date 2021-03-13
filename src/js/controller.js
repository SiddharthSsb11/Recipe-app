import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
//import View from './views/view.js';


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return

    await model.loadRecipe(id);
    
    // RENDER BOOKMARKS ON PAGELOAD
    bookmarksView.render(model.state.bookmarks);

    //view.renderSpinner()
    recipeView.render(model.state.recipe); 
    
    //console.log(model.state.recipe)
  }catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

controlRecipes();

const controlSearchResults = async function(){
  try{
    const query = searchView.getQuery();
    if(!query) return

    await model.loadSearchResults(query);

    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    //console.log(model.state.recipe)
  }catch(error){
    console.error(error)
  }
}

controlSearchResults();

//pagination btn click handler
const controlPaginationBtn = function(gotoPage){
  
  //rendering new btns and results after nxt/prev btn click
  resultsView.render(model.getSearchResultsPage(gotoPage))
  paginationView.render(model.state.search);
}

//servings btn handler
const controlServingsBtn = function(newServings){
  // Update the recipe servings (in state)
  // Update the recipe view
  model.updateServings(newServings);
  recipeView.render(model.state.recipe)
}

const controlAddBookmark = function(){

  //add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  //to make the -fill class applicable/work //updating recipeview
  recipeView.render(model.state.recipe);

  //// Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerRecipeServingsBtn(controlServingsBtn);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginationBtn(controlPaginationBtn);
}  

init()

