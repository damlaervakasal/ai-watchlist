const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function searchMovieByName(movieName) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    movieName
  )}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB:", error);
    return [];
  }
}

module.exports = { searchMovieByName };
