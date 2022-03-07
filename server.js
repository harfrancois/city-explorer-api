'use strict';
//Enter nodemon in terminal to  start nodemon.
//All requires must be at the top.

//Bring in dotenv to use .env.
require('dotenv').config();


//Must use require instead of import to create server/bring in Express.
const express = require('express');
//To set up cors.
const cors = require('cors');
//Adding the data
const weather = require('./modules/weather.js');
//To use express.
const app = express();


const PORT = process.env.PORT || 3003;
//To use cors.
app.use(cors());
const handleWeatherData = require('./modules/weather');
const handleMovieData = require('./modules/movies');
//Testing server functionality
console.log('Hello World!');
//testing PORT functionality.

app.get('/weather', handleWeatherData);
app.get('/movies', handleMovieData);

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
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
