'use strict';
//Enter nodemon in terminal to  start nodemon.
//All requires must be at the top.

//Bring in dotenv to use .env.
require('dotenv').config();

const axios = require('axios');
//Must use require instead of import to create server/bring in Express.
const express = require('express');
//To set up cors.
const cors = require('cors');
//Adding the data
// let data = require('./weather.json');
//To use express.
const app = express();
const PORT = process.env.PORT || 3002;
//To use cors.
app.use(cors());
//Testing server functionality
console.log('Hello World!');
//testing PORT functionality.



//Getting weather data
app.get('/weather', async (request, response) => {
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
  } catch (error) { //Catching for Errors
    response.status(500).send(error.message);
  }
});

//Getting movie data
app.get('/movies', async (request, response) => {
  try {
    //Url to request data.
    let searchQuery = request.query.searchQuery;
    let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    //request data with axios.
    let movieData = await axios.get(url);
    //Retrieving cretin data and creating new movie.
    let movieArr = movieData.data.results.map(result => new Movies(result));

    response.send(movieArr); //Out bound data
  } catch (error) { //Catching for Errors
    response.status(500).send(error.message);
  }
});



//Error handling 
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
//Constructor for the weather data.
class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime;
    this.description = forecast.weather.description;
  }
}

class Movies {
  constructor(result) {
    this.title = result.title;
  }
}


//Catch routes that doest\'t exist or not found.
app.get('*', (request, response) => {
  response.send('Rout doesn\'t exist');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


//NOTES:
//Creating basic default route.
//app.get('/',(request, response)=>{response.send('Hello World!');})

//Catch all response use '*' and must be at the bottom.
// app.get('*', (request, response) => {response.send('Rout doesn\'t exist');})
