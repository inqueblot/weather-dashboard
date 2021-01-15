$(document).ready(function () {

    var now = moment();
    // var cityNameArr = [];
    console.log(now);
    var date = now._d.getDate();
    var day = now._d.getDay();

    var cityNameArr = JSON.parse(localStorage.getItem("recent search"));

    for (let i = 0; i < cityNameArr.length; i++) {
        var cityButton = $("<button>").text(cityNameArr[i]);
        cityButton.addClass("reSearch");
        $("#cityBtn").append(cityButton);
    };

    var lastCity = localStorage.getItem("current search");

    queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&APPID=d851f45e5118d3cc096ba04daa669f4a&units=imperial"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var cityName = response.name;
        var cityIcon = response.weather[0].icon;
        var cityTemp = response.main.temp;
        var cityHumid = response.main.humidity;
        var cityWind = response.wind.speed.toFixed(1);
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;

        querxURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=d851f45e5118d3cc096ba04daa669f4a&units=imperial"

        $.ajax({
            url: querxURL,
            method: "GET"
        }).then(function (regards) {
            var uvI = regards.current.uvi;
            var currentCity = $("<div>").text(cityName + " Weather");
            var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + cityIcon + ".png");
            var currentTemp = $("<div>").text(cityTemp + "\xb0");
            var currentHumid = $("<div>").text(cityHumid + "%");
            var currentWind = $("<div>").text(cityWind + " MPH");
            var currentUVI = $("<div>").text(uvI);
            var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var dayOfWeek = dayArr[day];
          
            // this creates the current forecast
            var currentDate = $("<div>").text(dayOfWeek + ", " + date);
            $("#current").append(currentDate, currentCity, currentImg, currentTemp, currentHumid, currentWind, currentUVI);

            // this creates the future forecast
            for (let i = 1; i < 6; i++) {

                var futureTemp = regards.daily[i].temp.day;
                var futureHumidity = regards.daily[i].humidity;
                var futureIcon = regards.daily[i].weather[0].icon;
                var futureDay = dayArr[day + i];
                var futureDate = date + i;

                var future = $("<h5>").text(futureDay + ", " + futureDate);
                future.addClass("card-title")

                var card = $("<div>");
                card.addClass("card");
                card.attr("style", "width:10rem")

                var img = $("<img>");
                img.attr("src", "https://openweathermap.org/img/w/" + futureIcon + ".png");
                img.addClass("card-img-top");

                var span = $("<div>").text("temp: " + futureTemp + "\xb0");
                span.addClass("card-text");
                var span2 = $("<div>").text("humidity: " + futureHumidity + "%");
                span2.addClass("card-text");

                $("#future").append(card);
                card.append(img);
                card.append(future);
                card.append(span);
                card.append(span2);
            };
        });
    });
  
function getWeather() {

        $("#future").empty();
        $("#current").empty();
        var searchCity = $("#cityName").val().trim();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=d851f45e5118d3cc096ba04daa669f4a&units=imperial"
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var cityName = response.name;
            var cityIcon = response.weather[0].icon;
            var cityTemp = response.main.temp;
            var cityHumid = response.main.humidity;
            var cityWind = response.wind.speed.toFixed(1);
            var cityLat = response.coord.lat;
            var cityLon = response.coord.lon;

            querxURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=d851f45e5118d3cc096ba04daa669f4a&units=imperial"

            $.ajax({
                url: querxURL,
                method: "GET"
            }).then(function (regards) {
                var uvI = regards.current.uvi;
                var currentCity = $("<div>").text(cityName + " Weather");
                var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + cityIcon + ".png");
                var currentTemp = $("<div>").text(cityTemp + "\xb0");
                var currentHumid = $("<div>").text(cityHumid + "%");
                var currentWind = $("<div>").text(cityWind + " MPH");
                var currentUVI = $("<div>").text(uvI);
                var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var dayOfWeek = dayArr[day];
                console.log(date)
                var currentDate = $("<div>").text(dayOfWeek + ", " + date);
                $("#current").append(currentDate, currentCity, currentImg, currentTemp, currentHumid, currentWind, currentUVI);

                if (cityNameArr.includes(cityName) == false) {
                    cityNameArr.unshift(cityName);
                };


                if (cityNameArr.length == 6) {
                    cityNameArr.pop();
                };
                $("#cityBtn").empty();

                for (let i = 0; i < cityNameArr.length; i++) {
                    var cityButton = $("<button>").text(cityNameArr[i]);
                    cityButton.addClass("reSearch");
                    $("#cityBtn").append(cityButton);
                };


                // this creates the future forecast
                for (let i = 1; i < 6; i++) {

                    var futureTemp = regards.daily[i].temp.day;
                    var futureHumidity = regards.daily[i].humidity;
                    var futureIcon = regards.daily[i].weather[0].icon;
                    var futureDay = dayArr[day + i];
                    var futureDate = date + i;

                    var future = $("<h5>").text(futureDay + ", " + futureDate);
                    future.addClass("card-title")

                    var card = $("<div>");
                    card.addClass("card");
                    card.attr("style", "width:10rem")

                    var img = $("<img>");
                    img.attr("src", "https://openweathermap.org/img/w/" + futureIcon + ".png");
                    img.addClass("card-img-top");

                    var span = $("<div>").text("temp: " + futureTemp + "\xb0");
                    span.addClass("card-text");
                    var span2 = $("<div>").text("humidity: " + futureHumidity + "%");
                    span2.addClass("card-text");

                    $("#future").append(card);
                    card.append(img);
                    card.append(future);
                    card.append(span);
                    card.append(span2);




                };
                localStorage.setItem('recent search', JSON.stringify(cityNameArr))
                localStorage.setItem("current search", cityName)
            });
        });
    };
    // click event for search bar
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        getWeather();

    });

    // click event for recent search buttons
    $(".reSearch").on("click", function () {
        $("#current").empty();
        $("#future").empty();
        lastCity = $(this).text();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&APPID=d851f45e5118d3cc096ba04daa669f4a&units=imperial"
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var cityName = response.name;
            var cityIcon = response.weather[0].icon;
            var cityTemp = response.main.temp;
            var cityHumid = response.main.humidity;
            var cityWind = response.wind.speed.toFixed(1);
            var cityLat = response.coord.lat;
            var cityLon = response.coord.lon;

            querxURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=d851f45e5118d3cc096ba04daa669f4a&units=imperial"

            $.ajax({
                url: querxURL,
                method: "GET"
            }).then(function (regards) {
                var uvI = regards.current.uvi;
                var currentCity = $("<div>").text(cityName + " Weather");
                var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + cityIcon + ".png");
                var currentTemp = $("<div>").text(cityTemp + "\xb0");
                var currentHumid = $("<div>").text(cityHumid + "%");
                var currentWind = $("<div>").text(cityWind + " MPH");
                var currentUVI = $("<div>").text(uvI);
                var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var dayOfWeek = dayArr[day];
                console.log(date)
                var currentDate = $("<div>").text(dayOfWeek + ", " + date);
                $("#current").append(currentDate, currentCity, currentImg, currentTemp, currentHumid, currentWind, currentUVI);

                // this creates the future forecast
                for (let i = 1; i < 6; i++) {

                    var futureTemp = regards.daily[i].temp.day;
                    var futureHumidity = regards.daily[i].humidity;
                    var futureIcon = regards.daily[i].weather[0].icon;
                    var futureDay = dayArr[day + i];
                    var futureDate = date + i;

                    var future = $("<h5>").text(futureDay + ", " + futureDate);
                    future.addClass("card-title")

                    var card = $("<div>");
                    card.addClass("card");
                    card.attr("style", "width:10rem")

                    var img = $("<img>");
                    img.attr("src", "https://openweathermap.org/img/w/" + futureIcon + ".png");
                    img.addClass("card-img-top");

                    var span = $("<div>").text("temp: " + futureTemp + "\xb0");
                    span.addClass("card-text");
                    var span2 = $("<div>").text("humidity: " + futureHumidity + "%");
                    span2.addClass("card-text");

                    $("#future").append(card);
                    card.append(img);
                    card.append(future);
                    card.append(span);
                    card.append(span2);
                };
            });
        });
    });

});