import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearSearch = () => {
    elements.searchInput.value = '';
};

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (time) => {
    let timeArr = time.split(' ');
    timeArr = timeArr[0].split('-');
    const year = timeArr[0];
    const month = timeArr[1];
    let day = timeArr[2];

    for (let i = 1; i < 32; i++) {
        if (parseInt(day) === i) {
            day = i;
        }
    }

    return `${monthArr[parseInt(month) - 1]} ${day}, ${year}`
};

const formatCondition = (text) => {
    const text1 = text.toLowerCase();
    const arr = ['clear', 'sunny', 'cloudy', 'rain', 'mist', 'fog', 'snow', 'thunder', 'hail'];
    let condition;
    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        if(text1.includes(cur)) {
            condition = cur;
            break;
        }else{
            condition = 'cloudy';
        }
    }
    return condition;
};

const displayIcon = (text, time) => {
    /**
     * 1 - Change the svgs ids to match the current condition and time
     * 2 - Select svg and change the xlink:href attribute to the the svg with the current condition
     * 3 - You may need to pass the sunset and sunrise time to be more accurate or just set to 6AM and 6PM \(-_-)/
     */

    let timeArr = time.split(' ');
    let day;
    let hour = timeArr[1];
    hour = hour.split(':');
    if (parseInt(hour[0]) > 6 && parseInt(hour[0]) < 18){
        day = 'day'
    } else {
        day = 'night'
    }
    document.querySelector('.cur-icon use').setAttribute('href', `img/sprite.svg#${formatCondition(text)}-${day}`)

};

const formatForecast = (time) => {

    let timeArr = time.split('-');
    let day = timeArr[2];
    let month = timeArr[1];

    return {
        date: `${monthArr[parseInt(month) - 1]} ${day}`
    }

}

export const renderWeather = weather => {
    elements.curCity.textContent = `${weather.location.name},`;
    elements.curCountry.textContent = weather.location.country;
    elements.curDate.textContent = formatDate(weather.location.localtime);
    elements.curCondition.textContent = formatCondition(weather.current.condition.text);
    // display icon according to the condition and the time
    displayIcon(weather.current.condition.text, weather.location.localtime);
    elements.curTemp.textContent = `${Math.round(weather.current.temp_c)}°C`;

    elements.curHumidity.textContent = `${weather.current.humidity}%`;
    elements.curFeel.textContent = `${Math.round(weather.current.feelslike_c)}°C`;
    elements.curWindSpeed.textContent = `${weather.current.wind_kph}kph`;
    elements.curWindDir.textContent = weather.current.wind_dir;

    
    weather.forecast.forecastday.forEach((cur, i) => {
        elements.forecastDate[i].textContent = formatForecast(cur.date).date;
        elements.forecastTemp[i].textContent = `${Math.round(cur.day.avgtemp_c)}°C`;
        elements.forecastCondition[i].textContent = formatCondition(cur.day.condition.text);
    });
    
};