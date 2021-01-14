$(document).ready(function () {
    // console.log("hello world")

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var cityName = $("#cityName").val().trim();
        queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=d851f45e5118d3cc096ba04daa669f4a"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

        });

    })

});