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
    for(var i = 0; i < cities.length; i++){
        var city = cities[i];
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
var requestforcastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=imperial" + "&appid=" + apiKey;
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
    humidityInfo.textContent = "Humidity: " + humidity;
    windspeedInfo.textContent = "Wind: " + windspeed;
    forcastDateInfo.textContent = "Date: " + forcastDate.substring(0, 9);
    img.setAttribute("src", "http://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png")
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
var requestweatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial" + "&appid=" + apiKey;
fetch(requestweatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        var forcastDate = data.dt;
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;
        var weatherIconImg = data.weather[0].icon;
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var img = document.createElement("img");
        var cityName = document.querySelector("h2");
        var currentDate = document.querySelector("h3");
        var tempInfo = document.createElement("p");
        var humidityInfo = document.createElement("p");
        var windspeedInfo = document.createElement("p");
        cityName.textContent = cityInput.value;
        currentDate.textContent = "Date: " + forcastDate;
        img.setAttribute("src", "http://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png");
        tempInfo.textContent = "Temp: " + temp;
        humidityInfo.textContent = "Humidity: " + humidity;
        windspeedInfo.textContent = "Wind: " + windspeed;
        todayForcast.append(cityName);
        todayForcast.append(currentDate);
        todayForcast.append(img);
        li.append(tempInfo);
        li.append(humidityInfo);
        li.append(windspeedInfo);
        ul.append(li);
        todayForcast.append(ul);
        cities.push(cityName.textContent);
        storeCity();
        renderCities();
    })
        }

search.addEventListener("click", function(){
    if(cityInput.value !== null){
        getCurrentForcast()
        getFiveForcast()
        cityInput.value = "";
    }
        });
init()