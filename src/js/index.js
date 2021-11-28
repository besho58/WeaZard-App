import Search from "./models/Search";
import UserIP from "./models/UserIP";
import * as searchView from "./views/searchView";
import { elements, createLoader, removeLoader } from "./views/base";

const state = {};

/////////////////////////////////////////////////////////////////////
////////////////////Get Search Results///////////////////////////////
/////////////////////////////////////////////////////////////////////

const searchCrtl = async () => {
  //1:  GET THE USER INPUT

  const query = searchView.getInput();
  console.log(`Loading ${query}...`);

  if (query) {
    // 2:   CREATE LOADER
    createLoader();

    // 3:   PREPARE THE UI
    searchView.clearSearch();

    // 4:  GET THE RESULTS
    state.search = new Search(query);

    try {
      await state.search.getResults();
    } catch (error) {
      console.log(error);
    }

    // 5:   REMOVE LOADER
    removeLoader();

    // 6:   RENDER THE RESULTS TO THE UI
    searchView.renderWeather(state.search.results);
  }
};

/////////////////////////////////////////////////////////////////////
////////////////////FIND USER LOCATION///////////////////////////////
/////////////////////////////////////////////////////////////////////

const userLocation = async () => {
  /**
   * Simplify this shit -_-
   * Make gradient loaders to every single text
   */

  // 1 - LOADER IS ALREADY CREATED

  // 2 - FIND USER LOACTION
  state.userip = new UserIP();
  try {
    await state.userip.findIP();
  } catch (error) {
    console.log(error);
  }

  // 3 - PASS USER LOCATION TO THE SEARCH
  state.search = new Search(state.userip.userCity);

  // 4 - GET THE RESULTS
  try {
    await state.search.getResults();
  } catch (error) {
    console.log(error);
  }

  // 5 - REMOVE THE LOADER
  removeLoader();

  // 6 - RENDER THE RESULTS TO THE UI
  searchView.renderWeather(state.search.results);
};

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCrtl();
  console.log("submit");
});

window.addEventListener("load", userLocation);
