export const elements = {
    searchInput: document.querySelector('.search-box__field'),
    searchForm: document.querySelector('.search-form'),
    curCity: document.querySelector('.cur-city'),
    curCountry: document.querySelector('.cur-country'),
    curDate: document.querySelector('.cur-date'),
    curCondition: document.querySelector('.cur-condition'),
    curIcon: document.querySelector('.cur-icon'),
    curTemp: document.querySelector('.cur-temp'),
    curHumidity: document.querySelector('.cur-humidity'),
    curFeel: document.querySelector('.cur-feel-like'),
    curWindSpeed: document.querySelector('.cur-wind-speed'),
    curWindDir: document.querySelector('.cur-wind-dir'),
    forecastDate: Array.from(document.querySelectorAll('.forecast__date')),
    forecastTemp: Array.from(document.querySelectorAll('.forecast__temp')),
    forecastCondition: Array.from(document.querySelectorAll('.forecast__condition'))
};

export const createLoader = () => {
    const textArr = [elements.curCity, elements.curCountry, elements.curCondition, elements.curDate, elements.curIcon, elements.curTemp, elements.curHumidity, elements.curFeel, elements.curWindSpeed, elements.curWindDir, ...elements.forecastDate, ...elements.forecastTemp, ...elements.forecastCondition];

    textArr.forEach(cur => {
        cur.classList.add('loading');
    })
};
export const removeLoader = () => {
    const textArr = [elements.curCity, elements.curCountry, elements.curCondition, elements.curDate, elements.curIcon, elements.curTemp, elements.curHumidity, elements.curFeel, elements.curWindSpeed, elements.curWindDir, ...elements.forecastDate, ...elements.forecastTemp, ...elements.forecastCondition];

    textArr.forEach(cur => {
        cur.classList.remove('loading');
        // cur.textContent = '';
    })
};