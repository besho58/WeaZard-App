import axios from 'axios';

export default class {
    constructor(){}
    async findIP() {
        let IP;
        try {
            IP = await axios('http://ip-api.com/json/');
        } catch (error) {
            alert(error);
        }
        this.userCity = IP.data.city;
    }
}