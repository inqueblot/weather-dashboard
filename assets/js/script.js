$(document).ready(function () {
    // console.log("hello world")

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        $("#future").empty();
        $("#current").empty();
        var searchCity = $("#cityName").val().trim();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=d851f45e5118d3cc096ba04daa669f4a&units=imperial"

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
                var currentCity = $("<div>").text(cityName);
                var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + cityIcon + ".png");
                var currentTemp = $("<div>").text(cityTemp + "\xb0");
                var currentHumid = $("<div>").text(cityHumid + "%");
                var currentWind = $("<div>").text(cityWind + " MPH");
                var currentUVI = $("<div>").text(uvI);

                $("#current").append(currentCity, currentImg, currentTemp, currentHumid, currentWind, currentUVI);


                console.log(regards);

                // this creates the future forecast
                for (let i = 1; i < 8; i++) {

                    var futureTemp = regards.daily[i].temp.day;
                    var futureHumidity = regards.daily[i].humidity;
                    var futureIcon = regards.daily[i].weather[0].icon;
                    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + futureIcon + ".png");
                    var span = $("<div>").text("temp: " + futureTemp + "\xb0")
                    var span2 = $("<div>").text("humidity: " + futureHumidity + "%")
                    console.log(img)
                    $("#future").append(img);
                    $("#future").append(span);
                    $("#future").append(span2);

                };

            });
        });





    });




});