//function for getting the lat and lon by IPadress when a user comes to the page

import { setMap } from '../leafLetMap.js';
import { getWeather } from './getWeather.js';

const locationSearch = document.getElementById('location');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
let city;

export async function getLoacationByIp() {
  try {
    //get ip adres
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) {
      throw new Error('Network response not ok...');
    }
    const data = await res.json();
    const ip = data.ip;

    //get location data with ip
    const res2 = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!res2.ok) {
      throw new Error('Network response2 not ok...');
    }
    const data2 = await res2.json();
    //insert and set data
    setMap(data2.latitude, data2.longitude);
    locationSearch.textContent = `${data2.city},${data2.region},${data2.country}`;
    lat.textContent = `lat: ${data2.latitude}`;
    lon.textContent = `lon: ${data2.longitude}`;
    city = data2.city;

    // get weather data
    getWeather(data2.latitude, data2.longitude);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
