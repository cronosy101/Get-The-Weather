import { setMap } from './leafLetMap.js';
import { getLoacationByIp } from './functions/getLocByIp.js';
import { getWeather } from './functions/getWeather.js';
import { choseCity } from './functions/choseCity.js';

const myApi = '2caabe965d356a8726798a4dd2c00ba6';
const citySearchInput = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const locationSearch = document.getElementById('location');

let city;

searchBtn.addEventListener('click', () => {
  city = citySearchInput.value;
  //   console.log(city);
  getLatLon(city);
});

getLoacationByIp();

//get lat and lon bij city search
async function getLatLon(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},NL&limit=5&appid=${myApi}`
    );

    if (!res.ok) {
      throw new Error('Network response not ok');
    }
    const data = await res.json();

    if (data.length === 1) {
      locationSearch.textContent = `${data[0].name},${data[0].state},${data[0].country}`;
      lat.textContent = `lat: ${data[0].lat}`;
      lon.textContent = `lon: ${data[0].lon}`;
      setMap(data[0].lat, data[0].lon);
      getWeather(data[0].lat, data[0].lon);
    } else {
      choseCity(data);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// const fetch1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApi}&units=metric`;
// const fetch2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city},NL&limit=5&appid=${myApi}`;
