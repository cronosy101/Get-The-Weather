//funcion for getting weather data by lat and lon,and set the data on the page.

let compassSector = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];

const myApi = '2caabe965d356a8726798a4dd2c00ba6';
const weather_icon = document.getElementById('weather-icon');
const weather_description = document.getElementById('weather-description');
const temp = document.getElementById('temp');
const min_temp = document.getElementById('min-temp');
const max_temp = document.getElementById('max-temp');
const feel_temp = document.getElementById('feels-like');
const wind_direction = document.getElementById('wind-direction');
const wind_speed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

export async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApi}&units=metric`
    );

    if (!res.ok) {
      throw new Error('Network response not ok');
    }
    const data = await res.json();

    console.log(data);
    //set the data on the site
    weather_icon.setAttribute(
      'src',
      `./images/weather-icons/${data.weather[0].icon}.png`
    );
    weather_description.textContent = data.weather[0].description;
    temp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
    min_temp.innerHTML = `min temp: <p style="margin-right: 3.5rem;">${data.main.temp_min.toFixed(
      0
    )}&deg;C</p>`;
    max_temp.innerHTML = `max temp: <p style="margin-right: 3.5rem;">${data.main.temp_max.toFixed(
      0
    )}&deg;C</p>`;
    feel_temp.innerHTML = `feels like: <p>${data.main.feels_like.toFixed(
      0
    )}&deg;C</p>`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind_direction.innerHTML = `Direction: ${
      compassSector[(data.wind.deg / 22.5).toFixed(0)]
    }, ${data.wind.deg}&deg`;
    wind_speed.textContent = `Speed: ${data.wind.speed} m/s`;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// const fetch1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApi}&units=metric`;
// const fetch2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApi}&units=metric`;
