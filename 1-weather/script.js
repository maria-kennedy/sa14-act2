

// event listener
document.addEventListener('DOMContentLoaded', function () {
    //add const 
    const form = document.getElementById('search-form');
    const input = document.getElementById('city-input');
    const myApiKey = '0ce4e86cbcf747aaa39215703241904';

    // form event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = input.value;

        // fetch data from weather api
        fetch(`https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${city}&days=5&aqi=no&alerts=no`)
        .then(response => response.json())
        // send data to display function
        .then(data => {
            displayWeather(data);
            displayForecast(data.forecast.forecastDay);
        });
    });

    // display data function
    function displayWeather(data) {
        // elements from html file
        const cW = data.current;
        document.getElementById('current-time').textContent = 'Current time: ' + cW.last_updated;
        document.getElementById('current-temp').textContent = 'Current temperature: ' + cW.temp_f + '°F';
        document.getElementById('current-condition').textContent = 'Current condition: ' + cW.condition.text;
        document.getElementById('current-humidity').textContent = 'Current humidity: ' + cW.humidity + '%';
    }

    // 5 day forecast function
    function displayForecast(forecast) {
        const fC = document.getElementById('forecast-days');
        fC.innerHTML = '';
        // show high and low temps for next 5 days
        for (let i = 0; i < 5; i++) {
            const day = forecast[i];
            const div = document.createElement('div');
            div.textContent = day.date;
            div.textContent = `High: ${day.day.maxTemp_f}°F, Low: ${day.day.minTemp_f}°F`;
            fC.appendChild(div);
        }

    }
});
