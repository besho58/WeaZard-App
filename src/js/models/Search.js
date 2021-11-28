import axios from "axios";

const key = "2f89e24531144471b8562527210605";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${this.query}&days=5&aqi=no&alerts=no`
      );
      this.results = res.data;
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
  }
}
