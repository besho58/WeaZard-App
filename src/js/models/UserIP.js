import axios from "axios";

const apiKey = "at_pToBWyomMwjUb5syXEnj7srYdeX2D";

export default class {
  constructor() {}
  async findIP() {
    let IP;
    try {
      IP = await axios(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
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
    this.userCity = IP.data.location.city;
  }
}
