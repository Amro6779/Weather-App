'use strict'

const searchInput = document.querySelector('.search');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let coorDinates = [];
let weather = [];
let month = [];
let day = [];
let numDay = [];
let searchTerm ;

(function getPosition() {

    if (navigator.geolocation) {
    
        navigator.geolocation.getCurrentPosition(function(position) {
    
            coorDinates.push(position.coords.latitude);
            coorDinates.push(position.coords.longitude);

            getWeatherStatus(coorDinates[0] , coorDinates[1]);
        })
    };
})();

searchInput.addEventListener('input' , function(eventInfo) {
    
    searchTerm = eventInfo.target.value;

    coorDinates = [];
    getSearchInputStatus(searchTerm);
});

async function getWeatherStatus(lat , lon) {

    try {
       
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=93a0745011184d18bcf140657242908&q=${lat},${lon}&days=3`);
        let data = await response.json();
        weather = data;

        let localDate = [];
        for(let i = 0; i < 3; i++) {
            localDate.push(data.forecast.forecastday[i].date);
        }

        getTime(localDate);
    } catch(error) {

        console.log(error);
    };
};

async function getSearchInputStatus(city) {

    try {
       
        let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=93a0745011184d18bcf140657242908&q=${city}`);
        let data = await response.json();
        weather = data;
        coorDinates.push(weather[0].lat);
        coorDinates.push(weather[0].lon);

        getWeatherStatus(coorDinates[0] , coorDinates[1]);
    } catch(error) {

        console.log(error);
    };
};

function getTime(time) {

    for(let i = 0; i < 3; i++) {
        const date = new Date(time[i]);

        month.push(months[date.getMonth()]);
        day.push(days[date.getDay()]);
        numDay.push(date.getDate());
    };

    displayData();
}

function displayData() {

    let box = ` <div class="col-lg-4 px-0 text-white">
                    <header class="text-gray radius-top light d-flex justify-content-between fw-medium px-3 py-2">
                        <span>${day[0]}</span>
                        <span>${numDay[0]} ${month[0]}</span>
                    </header>
                    
                    <div class="content-1 radius-bottom-left px-3">
                        <p class="py-3 mb-0 text-gray fw-medium">${weather.location.name}</p>
                        <div class="state">
                            <h3 class="h1 me-4 fw-bold fs-70">${weather.current.temp_c}°C</h3>
                            <div class="pic my-2 w-25">
                                <img src="${weather.current.condition.icon}" class="w-100" alt="${weather.current.condition.text}">
                            </div>
                            <span class="text-info">${weather.current.condition.text}</span>
                        </div>
                        <div class="foot fw-medium my-4 ">
                            <span class="me-3 text-gray">
                                <img src="images/icon-umberella.png" class="me-1" alt="">
                                ${weather.forecast.forecastday[0].hour[0].chance_of_rain}%
                            </span>
                            <span class="me-3 text-gray">
                                <img src="images/icon-wind.png" class="me-1" alt="">
                                ${weather.current.wind_kph}Km/h
                            </span>
                            <span class="me-3 text-gray">
                                <img src="images/icon-compass.png" class="me-1" alt="">
                                East
                            </span>
                        </div>
                    </div>
                </div> 
                
                <div class="col-lg-4 px-0 text-white">
                    <header class="text-gray dark text-center fw-medium px-3 py-2">
                        <span>${day[1]}</span>
                    </header>
                    
                    <div class="content-2 overflow-auto">
                        <div class="state d-flex flex-column align-items-center">
                            <div class="pic mb-4 mt-5 w-25">
                                <img src="${weather.forecast.forecastday[1].day.condition.icon}" class="w-100"
                                     alt="${weather.forecast.forecastday[1].day.condition.text}">
                            </div>
                            <h3 class="h2 mb-0">${weather.forecast.forecastday[1].day.maxtemp_c}°C</h3>
                            <p class="text-gray">${weather.forecast.forecastday[1].day.mintemp_c}°</p>
                            <span class="text-info  mb-5">${weather.forecast.forecastday[1].day.condition.text}</span>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4 px-0 text-white">
                    <header class="text-gray radius-top-right light fw-medium px-3 py-2 text-center">
                        <span>${day[2]}</span>
                    </header>
                    
                    <div class="content-1 radius-bottom px-3 ">
                        <div class="state d-flex flex-column align-items-center">
                            <div class="pic mb-4 mt-5 w-25">
                                <img src="${weather.forecast.forecastday[2].day.condition.icon}" class="w-100" 
                                     alt="${weather.forecast.forecastday[2].day.condition.text}">
                            </div>
                            <h3 class="h2 mb-0">${weather.forecast.forecastday[2].day.maxtemp_c}°C</h3>
                            <p class="text-gray">${weather.forecast.forecastday[2].day.mintemp_c}°</p>
                            <span class="text-info mb-5">${weather.forecast.forecastday[2].day.condition.text}</span>
                        </div>
                    </div>
                </div>`
    
    
    document.querySelector('.row').innerHTML = box;
}