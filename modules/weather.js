'use strict';
const axios = require('axios');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
 

let cache = require('./cache.js');

function handleWeatherData(lat, lon) {
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}


// async function handleWeatherData(request, response) {
//   try {
//     //Url to request data.

//     let lat = request.query.lat;
//     let lon = request.query.lat;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
//     console.log(url);
//     //request data with axios.
//     let forecastData = await axios.get(url);
//     //Retrieving cretin data and creating new forecast.
//     let forecastArr = forecastData.data.data.map(forecast => new Forecast(forecast));

//     response.send(forecastArr); //Out bound data
//   } catch (error) { 
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     });
//   }
// }

// class Forecast {
//   constructor(forecast) {
//     this.date = forecast.datetime;
//     this.description = forecast.weather.description;
//   }
// }

module.exports = handleWeatherData;

