import { moviesEl, footerEl, moreBtnContainerEl } from '../js/main.js';
import { initMovies, initMovieDetails } from '../js/initialization.js';

export default async function renderSearchPage() {
  console.log('renderSearchPage 함수 실행!');
  initMovies();
  initMovieDetails();
  moviesEl.classList.remove('hidden');
  moreBtnContainerEl.classList.remove('hidden');
  footerEl.classList.remove('hidden');
  moviesEl.classList.remove('search');
  // 최초 호출!
  // const movies = await getMovies();
  // renderMovies(movies);
}
