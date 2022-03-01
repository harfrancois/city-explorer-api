'use strict';
const axios = require('axios');

async function handleWeatherData(request, response) {
  try {
    //Url to request data.

    let lat = request.query.lat;
    let lon = request.query.lat;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    console.log(url);
    //request data with axios.
    let forecastData = await axios.get(url);
    //Retrieving cretin data and creating new forecast.
    let forecastArr = forecastData.data.data.map(forecast => new Forecast(forecast));

    response.send(forecastArr); //Out bound data
  } catch (error) { 
    Promise.resolve().then(() => {
      throw new Error(error.message);
    });
  }
}

class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime;
    this.description = forecast.weather.description;
  }
}

module.exports = handleWeatherData;

