$(document).ready(function () {
    // console.log("hello world")

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var searchCity = $("#cityName").val().trim();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=d851f45e5118d3cc096ba04daa669f4a&units=imperial"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var cityName = response.name;
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
                var uvI = regards.current.uvi
                var futureTemp = regards.daily[0].temp.day;
                var futureHumidity = regards.daily[0].humidity;
                var futureIcon = regards.daily[0].weather[0].icon;

                for (let i = 0; i < 5; i++) {
                    var div = $("div");
                    div.text(boogers)

                }

            }

                console.log(regards);



        });


    });

})

});