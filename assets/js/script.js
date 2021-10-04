var apiKey = "8ebe0f0bd4e667fe78bf8341c8a7594d";
var cityFormEl = document.querySelector("#city-form");
var cityFormInputEl = document.querySelector("#city-input");
var cityHistoryEl = document.querySelector(".search-history");
var currentWeatherEl = document.querySelector(".weather-info");
var weatherForecastEl = document.querySelector(".forecast-info");

var refreshSearchHistory = function(){
    if (JSON.parse(localStorage.getItem("cityStorage")) === null) {
        cityStorage = [];
    }else{
        cityStorage = JSON.parse(localStorage.getItem("cityStorage"));
        cityHistoryEl.innerHTML = "";
        for (i = 0;i < cityStorage.length; i++){
            var cityListItem = document.createElement("div");
            cityListItem.className = "city-list-item";
            cityListItem.textContent = cityStorage[i];
            cityHistoryEl.appendChild(cityListItem);
        }
    }
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityFormInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cityFormInputEl.value = "";

    } else {
        alert("Please enter a city");
    }
};

var getLatLon = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    var cityStorage = JSON.parse(localStorage.getItem("cityStorage"));
    if (cityStorage === null) {
        cityStorage = [city,];
        localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
        refreshSearchHistory();
    }
    if (cityStorage.includes(city)){
    }else{
        cityStorage.push(city);
        localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
        refreshSearchHistory();
    };
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getWeather(lat,lon,city);            
    })
};   

var convertDate = function(timeStamp) {
    timeStamp = timeStamp * 1000;
    var dateObj = new Date(timeStamp);
    dateString = dateObj.toLocaleString();
    return dateString
};

var historyBtnClick = function(event){
    if (event.target.matches(".city-list-item")){
        var historyCity = event.target.textContent
        getLatLon(historyCity);
    }
}
    

var getWeather = function(lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        var cityWeatherData = {
            city:data.name,
            temp:data.current.temp,
            wind:data.current.wind_speed,
            humidity:data.current.humidity,
            uvIndex:data.current.uvi,
            day1Date:convertDate(data.daily[1].dt).split(",")[0],
            day1Icon:data.daily[1].weather[0].icon,
            day1Temp:data.daily[1].temp.day,
            day1Wind:data.daily[1].wind_speed,
            day1Humidity:data.daily[1].humidity,
            day2Date:convertDate(data.daily[2].dt).split(",")[0],
            day2Icon:data.daily[2].weather[0].icon,
            day2Temp:data.daily[2].temp.day,
            day2Wind:data.daily[2].wind_speed,
            day2Humidity:data.daily[2].humidity,
            day3Date:convertDate(data.daily[3].dt).split(",")[0],
            day3Icon:data.daily[3].weather[0].icon,
            day3Temp:data.daily[3].temp.day,
            day3Wind:data.daily[3].wind_speed,
            day3Humidity:data.daily[3].humidity,
            day4Date:convertDate(data.daily[4].dt).split(",")[0],
            day4Icon:data.daily[4].weather[0].icon,
            day4Temp:data.daily[4].temp.day,
            day4Wind:data.daily[4].wind_speed,
            day4Humidity:data.daily[4].humidity,
            day5Date:convertDate(data.daily[5].dt).split(",")[0],
            day5Icon:data.daily[5].weather[0].icon,
            day5Temp:data.daily[5].temp.day,
            day5Wind:data.daily[5].wind_speed,
            day5Humidity:data.daily[5].humidity
        }
    console.log(cityWeatherData);
    displayWeather (cityWeatherData,city)
    })
};

var displayWeather = function(cityWeatherData,city) {
    currentWeatherEl.innerHTML = "";
    var cityNameEl = document.createElement("h2");
    var tempEl = document.createElement("div");
    var windEl = document.createElement("div");
    var humidityEl = document.createElement("div");
    var uvEl = document.createElement("div");
    cityNameEl.textContent = city;
    tempEl.textContent = "Tempeature (F): " + cityWeatherData.temp;
    windEl.textContent = "Wind Speed (MPH): " + cityWeatherData.wind;
    humidityEl.textContent = "Humidity: " + cityWeatherData.humidity + " %";
    uvEl.textContent = "UV Index: " + cityWeatherData.uvIndex;
    if (cityWeatherData.uvIndex < 5) {
        uvEl.className = "badge rounded-pill bg-success"
    }else if (cityWeatherData.uvIndex >= 7){
        uvEl.className = "badge rounded-pill bg-danger"
    }else{
        uvEl.className = "badge rounded-pill bg-warning text-dark"
    }
    currentWeatherEl.appendChild(cityNameEl);
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(uvEl);

    weatherForecastEl.innerHTML = ""
    var cardEl = document.createElement("div");
    cardEl.className = "card";
    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.className = "card-header";
    var cardImgEl = document.createElement("img");
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    var cardTempItemEl = document.createElement("div");
    var cardWindItemEl = document.createElement("div");
    var cardHumidityItemEl = document.createElement("div");
    cardHeaderEl.textContent = cityWeatherData.day1Date;
    cardEl.appendChild(cardHeaderEl);
    cardTempItemEl.textContent = "Tempeature (F): " + cityWeatherData.day1Temp;
    cardBodyEl.appendChild(cardTempItemEl);
    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + cityWeatherData.day1Icon + "@2x.png")
    cardEl.appendChild(cardImgEl);
    cardWindItemEl.textContent = "Wind Speed (MPH): " + cityWeatherData.day1Wind;
    cardBodyEl.appendChild(cardWindItemEl);
    cardHumidityItemEl.textContent = "Humidity: " + cityWeatherData.day1Humidity + " %";
    cardBodyEl.appendChild(cardHumidityItemEl);
    cardEl.appendChild(cardBodyEl);
    weatherForecastEl.appendChild(cardEl);

    var cardEl = document.createElement("div");
    cardEl.className = "card";
    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.className = "card-header";
    var cardImgEl = document.createElement("img");
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    var cardTempItemEl = document.createElement("div");
    var cardWindItemEl = document.createElement("div");
    var cardHumidityItemEl = document.createElement("div");
    cardHeaderEl.textContent = cityWeatherData.day2Date;
    cardEl.appendChild(cardHeaderEl);
    cardTempItemEl.textContent = "Tempeature (F): " + cityWeatherData.day2Temp;
    cardBodyEl.appendChild(cardTempItemEl);
    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + cityWeatherData.day2Icon + "@2x.png")
    cardEl.appendChild(cardImgEl);
    cardWindItemEl.textContent = "Wind Speed (MPH): " + cityWeatherData.day2Wind;
    cardBodyEl.appendChild(cardWindItemEl);
    cardHumidityItemEl.textContent = "Humidity: " + cityWeatherData.day2Humidity + " %";
    cardBodyEl.appendChild(cardHumidityItemEl);
    cardEl.appendChild(cardBodyEl);
    weatherForecastEl.appendChild(cardEl);

    var cardEl = document.createElement("div");
    cardEl.className = "card";
    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.className = "card-header";
    var cardImgEl = document.createElement("img");
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    var cardTempItemEl = document.createElement("div");
    var cardWindItemEl = document.createElement("div");
    var cardHumidityItemEl = document.createElement("div");
    cardHeaderEl.textContent = cityWeatherData.day3Date;
    cardEl.appendChild(cardHeaderEl);
    cardTempItemEl.textContent = "Tempeature (F): " + cityWeatherData.day3Temp;
    cardBodyEl.appendChild(cardTempItemEl);
    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + cityWeatherData.day3Icon + "@2x.png")
    cardEl.appendChild(cardImgEl);
    cardWindItemEl.textContent = "Wind Speed (MPH): " + cityWeatherData.day3Wind;
    cardBodyEl.appendChild(cardWindItemEl);
    cardHumidityItemEl.textContent = "Humidity: " + cityWeatherData.day3Humidity + " %";
    cardBodyEl.appendChild(cardHumidityItemEl);
    cardEl.appendChild(cardBodyEl);
    weatherForecastEl.appendChild(cardEl);

    var cardEl = document.createElement("div");
    cardEl.className = "card";
    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.className = "card-header";
    var cardImgEl = document.createElement("img");
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    var cardTempItemEl = document.createElement("div");
    var cardWindItemEl = document.createElement("div");
    var cardHumidityItemEl = document.createElement("div");
    cardHeaderEl.textContent = cityWeatherData.day4Date;
    cardEl.appendChild(cardHeaderEl);
    cardTempItemEl.textContent = "Tempeature (F): " + cityWeatherData.day4Temp;
    cardBodyEl.appendChild(cardTempItemEl);
    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + cityWeatherData.day4Icon + "@2x.png")
    cardEl.appendChild(cardImgEl);
    cardWindItemEl.textContent = "Wind Speed (MPH): " + cityWeatherData.day4Wind;
    cardBodyEl.appendChild(cardWindItemEl);
    cardHumidityItemEl.textContent = "Humidity: " + cityWeatherData.day4Humidity + " %";
    cardBodyEl.appendChild(cardHumidityItemEl);
    cardEl.appendChild(cardBodyEl);
    weatherForecastEl.appendChild(cardEl);

    var cardEl = document.createElement("div");
    cardEl.className = "card";
    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.className = "card-header";
    var cardImgEl = document.createElement("img");
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    var cardTempItemEl = document.createElement("div");
    var cardWindItemEl = document.createElement("div");
    var cardHumidityItemEl = document.createElement("div");
    cardHeaderEl.textContent = cityWeatherData.day5Date;
    cardEl.appendChild(cardHeaderEl);
    cardTempItemEl.textContent = "Tempeature (F): " + cityWeatherData.day5Temp;
    cardBodyEl.appendChild(cardTempItemEl);
    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + cityWeatherData.day5Icon + "@2x.png")
    cardEl.appendChild(cardImgEl);
    cardWindItemEl.textContent = "Wind Speed (MPH): " + cityWeatherData.day5Wind;
    cardBodyEl.appendChild(cardWindItemEl);
    cardHumidityItemEl.textContent = "Humidity: " + cityWeatherData.day5Humidity + " %";
    cardBodyEl.appendChild(cardHumidityItemEl);
    cardEl.appendChild(cardBodyEl);
    weatherForecastEl.appendChild(cardEl);

}

refreshSearchHistory();
cityHistoryEl.addEventListener("click", historyBtnClick)
cityFormEl.addEventListener("submit", formSubmitHandler)
