import {
  initMovies,
  getMovies,
  page,
  renderMovies,
  initMovieDetails,
  moviesEl,
  moreBtnContainerEl,
} from '../js/main.js';
import { getMovieInfo } from '../js/movie.js';

export default async function renderSearchPage() {
  console.log('renderSearchPage 함수 실행!');
  moviesEl.classList.remove('hidden');
  initMovies();
  initMovieDetails();
  // 최초 호출!
  const movies = await getMovies();
  moreBtnContainerEl.classList.remove('hidden');
  renderMovies(movies);
}
