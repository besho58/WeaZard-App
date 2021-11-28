import axios from "axios";

const apiKey = "at_pToBWyomMwjUb5syXEnj7srYdeX2D";

export default class {
  constructor() {}
  async findIP() {
    let IP;
    try {
      IP = await axios(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
    } catch (error) {
      console.log(error);
    }
    console.log(IP);
    this.userCity = IP.data.location.city;
  }
}
