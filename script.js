var cityInput = document.querySelector("input");
var search = document.querySelector("button");
var todayForcast = document.querySelector("#today-forcast");
var forcastDays = document.querySelector("#weather-forcast");
var searchHistory = document.querySelector("#search-history ul");
var cities = [];

function init(){
    var storeCities = JSON.parse(localStorage.getItem("storeCities"));
    if(storeCities !== null){
        cities = storeCities;
    }
    renderCities();

}   

function renderCities(){
    searchHistory.innerHTML = "";
    var filterCities = [...new Set(cities)];
    for(var i = 0; i < filterCities.length; i++){
        var city = filterCities[i];
        var li = document.createElement("li");
        li.textContent = city;
        searchHistory.append(li);
    }
}

function storeCity(){
    localStorage.setItem("storeCities", JSON.stringify(cities));
}

function getFiveForcast(){
var apiKey = "4f059f7bfca054edbd22eb4a94ffa229";
var requestforcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=imperial" + "&appid=" + apiKey;
fetch (requestforcastUrl)
.then(function (response) {
    return response.json();
})
.then(function (data){
    for(var i = 0; i < 40; i += 8){
    var forcastDate = data.list[i].dt_txt;
    var temp = data.list[i].main.temp;
    var humidity = data.list[i].main.humidity;
    var windspeed = data.list[i].wind.speed;
    var weatherIconImg = data.list[i].weather[0].icon;
    var li = document.createElement("li");
    var img = document.createElement("img");
    var tempInfo = document.createElement("p");
    var humidityInfo = document.createElement("p");
    var windspeedInfo = document.createElement("p");
    var forcastDateInfo = document.createElement("p");
    tempInfo.textContent = "Temp: " + temp;
    humidityInfo.textContent = "Humidity: " + humidity + "%";
    windspeedInfo.textContent = "Wind: " + windspeed + "MPH";
    forcastDateInfo.textContent = "Date: " + forcastDate.substring(0, 10);
    img.setAttribute("src", "https://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png")
    li.append(forcastDateInfo);
    li.append(img);
    li.append(tempInfo);
    li.append(humidityInfo);
    li.append(windspeedInfo);
    forcastDays.append(li);
    }
})
}

function getCurrentForcast(){
var apiKey = "4f059f7bfca054edbd22eb4a94ffa229";
var requestweatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial" + "&appid=" + apiKey;
fetch(requestweatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var currentDate = new Date(data.dt * 1000);
        var utcDate = currentDate.toUTCString();
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
        var weatherIconImg = data.weather[0].icon;
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var img = document.createElement("img");
        var dateTime = document.createElement("h2")
        var cityName = document.createElement("h2");
        var tempInfo = document.createElement("p");
        var humidityInfo = document.createElement("p");
        var windspeedInfo = document.createElement("p");
        dateTime.textContent = "Date: " + utcDate.substring(0, 11);
        cityName.textContent = cityInput.value;
        img.setAttribute("src", "https://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png");
        tempInfo.textContent = "Temp: " + temp;
        humidityInfo.textContent = "Humidity: " + humidity + "%";
        windspeedInfo.textContent = "Wind: " + windspeed + "MPH";
        todayForcast.append(dateTime);
        todayForcast.append(cityName);
        todayForcast.append(img);
        li.append(tempInfo);
        li.append(humidityInfo);
        li.append(windspeedInfo);
        ul.append(li);
        todayForcast.append(ul);
        cities.push(cityName.textContent);
        cityInput.value = "";
        storeCity();
        renderCities();
        getCurrentUvi(lat, lon, apiKey);
    })
        }

function getCurrentUvi(lat, lon, apiKey){
    var requestUviWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
fetch(requestUviWeatherUrl)
    .then(function (response){
        return response.json();
    })
    .then( function (data){
        var currentUvi = data.current.uvi;
        var uviInfo = document.createElement("p");
        var uviValue = document.createElement("p");
        var div = document.createElement("div");
        uviInfo.textContent = "UV Index";
        uviValue.textContent = currentUvi;
        if(currentUvi <= 2){
            uviValue.setAttribute("style", "background-color: lightgreen;");
        }
        else if(currentUvi > 2 && currentUvi <= 7){
            uviValue.setAttribute("style", "background-color: lightyellow;");
        }
        else{
            
            uviValue.setAttribute("style", "background-color: lightred;");
        }
        div.append(uviInfo);
        div.append(uviValue);
        todayForcast.append(div);

    })
}
search.addEventListener("click", function(){
    if(cityInput.value !== null){
        getCurrentForcast()
        getFiveForcast()
    }
        });
init()