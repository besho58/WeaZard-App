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
      console.log(this.results);
    } catch (error) {
      console.log(error);
    }
  }
}
