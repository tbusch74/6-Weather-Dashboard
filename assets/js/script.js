var apiKey = "8ebe0f0bd4e667fe78bf8341c8a7594d";
var cityFormEl = document.querySelector("#city-form");
var cityFormInputEl = document.querySelector("#city-input");
cityStorage = [];

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
    if (cityStorage === null) {
        cityStorage = []
    }else{
        if (cityStorage.includes(city)){
        }else{
            cityStorage.push(city);
        }
    };
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getWeather(lat,lon);            
     });
}   

var convertDate = function(timeStamp) {
    timeStamp = timeStamp * 1000;
    var dateObj = new Date(timeStamp);
    dateString = dateObj.toLocaleString();
    return dateString
}

var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        var cityWeatherData = {
            temp:data.current.temp,
            wind:data.current.wind_speed,
            humidity:data.current.humidity,
            uvIndex:data.current.uvi,
            day1Date:convertDate(data.daily[1].dt),
            day1Icon:data.daily[1].weather[0].icon,
            day1Temp:data.daily[1].temp,
            day1Wind:data.daily[1].wind_speed,
            day1Humidity:data.daily[1].humidity,
            day2Date:convertDate(data.daily[2].dt),
            day2Icon:data.daily[2].weather[0].icon,
            day2Temp:data.daily[2].temp,
            day2Wind:data.daily[2].wind_speed,
            day2Humidity:data.daily[2].humidity,
            day3Date:convertDate(data.daily[3].dt),
            day3Icon:data.daily[3].weather[0].icon,
            day3Temp:data.daily[3].temp,
            day3Wind:data.daily[3].wind_speed,
            day3Humidity:data.daily[3].humidity,
            day4Date:convertDate(data.daily[4].dt),
            day4Icon:data.daily[4].weather[0].icon,
            day4Temp:data.daily[4].temp,
            day4Wind:data.daily[4].wind_speed,
            day4Humidity:data.daily[4].humidity,
            day5Date:convertDate(data.daily[5].dt),
            day5Icon:data.daily[5].weather[0].icon,
            day5Temp:data.daily[5].temp,
            day5Wind:data.daily[5].wind_speed,
            day5Humidity:data.daily[5].humidity
        }
    })
}

cityFormEl.addEventListener("submit", formSubmitHandler)
