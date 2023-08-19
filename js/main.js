// today variables

let dayName = document.getElementById('dayName')

let dayNumber = document.getElementById('dayNumber')

let todayMonth = document.getElementById('todayMonth')

let todayLocation = document.getElementById('todayLocation')

let todayTemp = document.getElementById('todayTemp')

let todayConditionImg = document.getElementById("todayConditionImg")

let todayText = document.getElementById('todayText')

let humidity = document.getElementById('humidity')

let wind = document.getElementById('wind')

let windDirection = document.getElementById('windDirection')

// next data

let nextDayName = document.getElementsByClassName('nextDayName')

let nextConditionImg = document.getElementsByClassName('nextConditionImg')

let nextMaxTemp = document.getElementsByClassName('nextMaxTemp')

let nextMinTemp = document.getElementsByClassName('nextMinTemp')

let nextConditionText = document.getElementsByClassName('nextConditionText')

// search input

let search = document.getElementById('search')

// let date = new Date("2023-08-19");
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-us" , {weekday:'long'}));
// console.log(date.toLocaleDateString("en-us" , {month:'long'}));
// fetch API data 

async function getWeatherData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ec41603be898411e80e133810231908&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json();
    // console.log(weatherData);
    return weatherData
}
// display today data 
let todayDate = new Date();

function displayData(data) {
    dayName.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday:'long'})
    dayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month:'long'})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src" , data.current.condition.icon)
    todayText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}
function displayNextData(data) {
    let forecastData = data.forecast.forecastday

    // console.log(nextMaxTemp);
    // console.log(forecastData);
    for (let i = 0; i < 2; i++) {
        let tomorrowDate = new Date(forecastData[i+1].date)
        nextDayName[i].innerHTML = tomorrowDate.toLocaleDateString("en-us" , {weekday:'long'})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c 
        nextConditionImg[i].setAttribute("src" , forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}
async function allApiData(city = "cairo") {
    let weatherData = await getWeatherData(city)
    if (!weatherData.error) {
        displayData(weatherData);
        displayNextData(weatherData );
    }

}
allApiData();

search.addEventListener("input" , function () {
    allApiData(search.value)
})

