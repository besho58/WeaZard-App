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
  `Loading ${query}...`;

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
      document.getElementById(
        "container"
      ).innerHTML = `${error} <br /> Check your connection and reload or go to <a
              href="https://github.com/besho58/WeaZard-App"
              title="WeaZard App Github"
              class="footer__link"
            >
              <span class="footer__link__text">WeaZard's GitHub</span>
              <svg class="footer__link__icon">
                <use xlink:href="img/sprite-icon.svg#icon-github1"></use>
              </svg>
            </a> and contact me.`;
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
    document.getElementById(
      "container"
    ).innerHTML = `${error} \n check your connection and reload or go to github and contact me`;
  }

  // 3 - PASS USER LOCATION TO THE SEARCH
  state.search = new Search(state.userip.userCity);

  // 4 - GET THE RESULTS
  try {
    await state.search.getResults();
  } catch (error) {
    document.getElementById(
      "container"
    ).innerHTML = `${error} \n check your connection and reload or go to github and contact me`;
  }

  // 5 - REMOVE THE LOADER
  removeLoader();

  // 6 - RENDER THE RESULTS TO THE UI
  searchView.renderWeather(state.search.results);
};

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCrtl();
});

window.addEventListener("load", userLocation);
