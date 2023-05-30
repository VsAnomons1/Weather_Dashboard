var body = document.querySelector("body");
var cityInput = document.querySelector("input");
var queryCity = document.location.href.split("=")[1];
cityInput.setAttribute("value", queryCity);
var search = document.querySelector("button");
var todayForcast = document.querySelector("#today-forcast");
var forcastDays = document.querySelector("#weather-forcast");
var searchHistory = document.querySelector(".dropdown-menu");
var cities = [];
// Updates cities to the localstorage data upon load
function init(){
    var storeCities = JSON.parse(localStorage.getItem("storeCities"));
    if(storeCities !== null){
        cities = storeCities;
    }
    renderCities();

}   
// Renders cities that been previously searched
function renderCities(){
    searchHistory.innerHTML = "";
    
// filters to distinct cities only
    var filterCities = [...new Set(cities)];
    for(var i = 0; i < filterCities.length; i++){
        var city = filterCities[i];
        var li = document.createElement("li");
        li.setAttribute("class", "dropdown-item");
        li.textContent = city;
        searchHistory.append(li);
    }
}
// stores the cities array to the localstorage
function storeCity(){
    localStorage.setItem("storeCities", JSON.stringify(cities));
}
// fetches the five-day forcast weather data from the Open Weather Api
function getFiveForcast(){
var apiKey = "4f059f7bfca054edbd22eb4a94ffa229";
var requestforcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=imperial" + "&appid=" + apiKey;
fetch (requestforcastUrl)
.then(function (response) {
    return response.json();
})
.then(function (data){
   
    for(var i = 0; i < 40; i += 8){
    var forcastDate = new Date(data.list[i].dt_txt);
    var dayOfTheWeek = String(forcastDate).slice(0, 4);
    var temp = data.list[i].main.temp;
    var humidity = data.list[i].main.humidity;
    var windspeed = data.list[i].wind.speed;
    var weatherIconImg = data.list[i].weather[0].icon;
    var td = document.createElement("td");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body text-center");
    var img = document.createElement("img");
    img.setAttribute("class", "img-fluid w-50");
    var ul = document.createElement("ul");
    ul.setAttribute("class", "list-group");
    var tempInfo = document.createElement("li");
    tempInfo.setAttribute("class", "list-group-item");
    var humidityInfo = document.createElement("li");
    humidityInfo.setAttribute("class", "list-group-item");
    var windspeedInfo = document.createElement("li");
    windspeedInfo.setAttribute("class", "list-group-item");
    var forcastDateInfo = document.createElement("p");
    var span = document.createElement("span");
    span.innerHTML = "&#176;";
    tempInfo.textContent = "Temp: " + Math.ceil(temp) + span.innerText;
    humidityInfo.textContent = "Humidity: " + humidity + "%";
    windspeedInfo.textContent = "Wind: " + windspeed + "MPH";
    forcastDateInfo.textContent = dayOfTheWeek;
    img.setAttribute("src", "https://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png");
    td.append(card);
    card.append(cardBody);
    cardBody.append(forcastDateInfo);
    cardBody.append(img);
    cardBody.append(ul);
    ul.append(tempInfo);
    ul.append(humidityInfo);
    ul.append(windspeedInfo);
    forcastDays.append(td);
    }
})
}
// fetches the current weather data from the Open Weather Api
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
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body text-center");
        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-horizontal");
        var liOne = document.createElement("li");
        liOne.setAttribute("class", "list-group-item flex-fill");
        var liTwo = document.createElement("li");
        liTwo.setAttribute("class", "list-group-item flex-fill");
        var liThree = document.createElement("li");
        liThree.setAttribute("class", "list-group-item flex-fill");
        var img = document.createElement("img");
        img.setAttribute("class", "img-fluid");
        img.setAttribute("style", "width: 8em");
        var dateTime = document.createElement("h2")
        var cityName = document.createElement("h2");
        cityName.setAttribute("class", "text-center");
        var tempInfo = document.createElement("p");
        var humidityInfo = document.createElement("p");
        var windspeedInfo = document.createElement("p");
        dateTime.textContent = "Date: " + utcDate.substring(0, 11);
        // sets city to Pascal case
        var setName = cityInput.value[0].toUpperCase() + cityInput.value.slice(1).toLowerCase();
        cityName.textContent = setName;
        img.setAttribute("src", "https://openweathermap.org/img/wn/" +weatherIconImg + "@2x.png");
        var span = document.createElement("span");
        span.innerHTML = "&#176;";
        tempInfo.textContent = "Temp: " + Math.ceil(temp) + span.innerText;
        humidityInfo.textContent = "Humidity: " + humidity + "%";
        windspeedInfo.textContent = "Wind: " + windspeed + "MPH";
        cardBody.append(cityName);
        cardBody.append(img);
        cardBody.append(ul);
        liOne.append(tempInfo);
        liTwo.append(humidityInfo);
        liThree.append(windspeedInfo);
        ul.append(liOne);
        ul.append(liTwo);
        ul.append(liThree);
        todayForcast.append(cardBody);
        cities.push(cityName.textContent);
        cityInput.value = "";
        storeCity();
        renderCities();
        getCurrentUvi(lat, lon, apiKey, cardBody);
    })
        }
// fetches the current Uvi Index of the forcast in Open Weather Api
function getCurrentUvi(lat, lon, apiKey, cardBody){
    var requestUviWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
fetch(requestUviWeatherUrl)
    .then(function (response){
        return response.json();
    })
    .then( function (data){
        var currentUvi = data.current.uvi;
        var uviInfo = document.createElement("p");
        var uviValue = document.createElement("p");
        var progress = document.createElement("div");
        progress.setAttribute("class", "progress");
        var progressBar = document.createElement("div");
        progressBar.setAttribute("class", "progress-bar");
        uviInfo.textContent = "UV Index";
        uviValue.textContent = currentUvi;
        if(currentUvi <= 2){
            progressBar.setAttribute("class", "bg-success");
            progressBar.setAttribute("style", "width: 20%");
        }
        else if(currentUvi > 2 && currentUvi <= 5){
            progressBar.setAttribute("class", "bg-warning");
            progressBar.setAttribute("style", "width: 40%");

        }
        else if(currentUvi >= 6 && currentUvi <= 7){
            progressBar.setAttribute("style", "background-color: lightorange;");
            progressBar.setAttribute("style", "width: 60%");
        }
        else if(currentUvi >= 8 && currentUvi <= 10){
            progressBar.setAttribute("class", "bg-danger");
            progressBar.setAttribute("style", "width: 80%");
        }
        else {
            progressBar.setAttribute("style", "background-color: lightpurple;");
            progressBar.setAttribute("style", "width: 100%");
        }
        progress.append(progressBar);
        cardBody.append(uviInfo);
        cardBody.append(uviValue);
        cardBody.append(progress);

    })
}
// Checks if input text is empty before excueting
search.addEventListener("click", function(){
        if(cityInput !== null){
        todayForcast.innerHTML = "";
        forcastDays.innerHTML = "";
        getCurrentForcast();
        getFiveForcast();
        }
});
// Gets previous search cities
searchHistory.addEventListener("click", function(e){
    var cityTarget = e.target;
    cityInput.value = cityTarget.textContent;
    todayForcast.innerHTML = "";
    forcastDays.innerHTML = "";
    getCurrentForcast();
    getFiveForcast();
});
init();
// Sets the intial city weather
getCurrentForcast();
getFiveForcast();