'use strict';
const axios = require('axios');

async function handleMovieData(request, response) {
  try {
    //Url to request data.
    let searchQuery = request.query.searchQuery;
    console.log(searchQuery);
    let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    //request data with axios.
    let movieData = await axios.get(url);
    //Retrieving cretin data and creating new movie.
    let movieArr = movieData.data.results.map(result => new Movies(result));

    response.send(movieArr); //Out bound data
  } catch (error) { //Catching for Errors
    Promise.resolve().then(() => {
      throw new Error(error.message);
    });
  }
}

class Movies {
  constructor(result) {
    this.title = result.title;
  }
}

module.exports = handleMovieData;
