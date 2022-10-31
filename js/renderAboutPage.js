import { initMovies, initMovieDetails } from '../js/main.js';
import { getMovieInfo } from '../js/movie.js';

export default function renderAboutPage() {
  initMovies();
  initMovieDetails();
}
