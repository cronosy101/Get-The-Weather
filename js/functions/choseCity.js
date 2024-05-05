//fucntion for choosing a city if the data returns more then 1 location.

import { getWeather } from './getWeather.js';
import { setMap } from '../leafLetMap.js';

let location = document.getElementById('location');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');

export function choseCity(data) {
  console.log(data);
  //reset the data
  location.innerHTML = '';
  lat.innerHTML = '';
  lon.innerHTML = '';

  //loop over the data
  data.forEach((city) => {
    const newh3 = document.createElement('h3');
    newh3.textContent = `${city.name},${city.state},${city.country}`;

    //set the data from a chosen city when a element is clicked
    newh3.addEventListener('click', () => {
      console.log(`you clicked ${city.name}, ${city.state}`);
      getWeather(city.lat, city.lon);
      setMap(city.lat, city.lon);
      location.textContent = `${city.name},${city.state},${city.country}`;
      lat.textContent = `lat: ${city.lat}`;
      lon.textContent = `lon: ${city.lon}`;
    });
    //change size and color of focused element
    newh3.addEventListener('mouseover', () => {
      newh3.style.fontSize = '1.8rem';
      newh3.style.color = 'white';
      newh3.style.cursor = 'pointer';
    });

    newh3.addEventListener('mouseout', () => {
      newh3.style.fontSize = '';
      newh3.style.color = '';
      newh3.style.cursor = '';
    });

    location.appendChild(newh3);
  });
}
