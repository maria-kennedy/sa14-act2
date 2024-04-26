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
        fetch(`https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${city}`)
        .then(response => response.json())
        // send data to display function
        .then(data => {
            displayWeather(data);
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

        // display 5-day forecast
        const fD = document.getElementById('forecast-days');
        fD.innerHTML = ''; // to clear prev data
        
        // loop to display 5 days
        for (let i = 0; i < 5; i++) {
            const fC = data.forecast.forecastDay[i];
            const fItem = document.createElement("div");
            fItem.classList.add('forecast-item');
            fItem.innerHTML = `
                <div>${fC.date}</div>
                <div>${fC.day.condition.text}</div>
            `;
            fD.appendChild(fItem);
        }   

    }
});
