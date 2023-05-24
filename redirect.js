var cityName = document.getElementById("cityName");
var searchBtn = document.getElementById("btn");

function searchHandler(){
    var nameOfCity = cityName.value;
    if(nameOfCity !== ""){
       validCity(nameOfCity);
    }
    else {
        document.location.reload();
    }
}

function validCity(city){
var apiKey = "4f059f7bfca054edbd22eb4a94ffa229";
var requestweatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
console.log(requestweatherUrl);
fetch(requestweatherUrl)
    .then(function(response){
        if(response.status === 200){
            document.location.replace("home.html" + "?=" + city);
        }
        else {
            document.location.reload();
        }
    })
}

searchBtn.addEventListener("click", function(e) {
    searchHandler();
});
