$(document).ready(function () {
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

  $("#searchBtn").click(function () {
    const city = $("#cityInput").val().trim();
    if (!city) return;
    fetchWeather(city);
  });

  function fetchWeather(city) {
    // Current weather
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    // 5-day forecast (3-hour intervals)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    $.getJSON(currentURL, function (data) {
      $("#currentWeather").removeClass("d-none");
      $("#cityName").text(`${data.name}, ${data.sys.country}`);
      $("#currentTemp").text(`Temperature: ${data.main.temp} °C`);
      $("#currentHumidity").text(`Humidity: ${data.main.humidity}%`);
      $("#currentCondition").text(`Condition: ${data.weather[0].description}`);
    });

    $.getJSON(forecastURL, function (data) {
      $("#forecast").empty();
      // Filter one forecast per day (e.g. noon)
      const daily = {};
      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!daily[date] && item.dt_txt.includes("12:00:00")) {
          daily[date] = item;
        }
      });
      Object.values(daily).slice(0,5).forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp.toFixed(1);
        const desc = day.weather[0].description;
        const icon = day.weather[0].icon;

        $("#forecast").append(`
          <div class="col-md-2 col-6">
            <div class="card forecast-card text-center">
              <div class="card-body">
                <h6>${date}</h6>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                <p>${temp} °C</p>
                <small>${desc}</small>
              </div>
            </div>
          </div>
        `);
      });
    });
  }
});
