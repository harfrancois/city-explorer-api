'use strict';
//Enter nodemon in terminal to  start nodemon.
//All requires must be at the top.

//Bring in dotenv to use .env.
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//Must use require instead of import to create server/bring in Express.
const express = require('express');

//Adding the data
let data = require('./data/weather.json');

//To use express.
const app = express();

//Testing server functionality
console.log('Hello World!');
//testing PORT functionality.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

class Forecast {
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;

  }
}

app.get('/weather',(request, response) => {
  let city_name = request.query.city_name;
  let cityData = data.find(city => city.city_name.toLowerCase() === city_name.toLowerCase());
  let forecastArray = cityData.data.map(day => new Forecast(day));
  response.send(forecastArray);
});



//Catch routes that doest\'t exist or not found.
app.get('*', (request, response) => {
  response.send('Rout doesn\'t exist');
});



//Creating basic default route.
//app.get('/',(request, response)=>{response.send('Hello World!');})

//Catch all response use '*' and must be at the bottom.
// app.get('*', (request, response) => {response.send('Rout doesn\'t exist');})
