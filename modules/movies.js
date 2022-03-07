'use strict';
const axios = require('axios');
const { response } = require('express');
let cache = require('./cache.js')

function handleMovieData(request, response) {
  //Url to request data.
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  //request data with axios.
  let movieData = await axios.get(url);
  //Retrieving cretin data and creating new movie.
  let movieArr = movieData.data.results.map(result => new Movies(result));

  if (cache[searchQuery] && (Date.now() - cache[searchQuery].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[searchQuery] = {};
    cache[searchQuery].timestamp = Date.now();
    cache[searchQuery].data = axios.get(url);
    console.log('Storing in cache:', Object.keys(cache[searchQuery]))
  }

  let movieAPIData = cache[searchQuery].data;
  let movies = movieAPIData.data.result.map((result) => new Movies(result));
  response.send(movieArr);
}

class Movies {
  constructor(result) {
    this.title = result.title;
  }
}

// async function handleMovieData(request, response) {
//   try {
//     //Url to request data.
//     let searchQuery = request.query.searchQuery;
//     console.log(searchQuery);
//     let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
//     //request data with axios.
//     let movieData = await axios.get(url);
//     //Retrieving cretin data and creating new movie.
//     let movieArr = movieData.data.results.map(result => new Movies(result));

//     response.send(movieArr); //Out bound data
//   } catch (error) { //Catching for Errors
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     });
//   }
// }



module.exports = handleMovieData;
