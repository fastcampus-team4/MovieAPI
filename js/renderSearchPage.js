import { initMovies, initMovieDetails } from '../js/initialization.js';

export default async function renderSearchPage(page, moreBtnEl, moviesEl, footerEl, moreBtnContainerEl, movieDetailEl) {
  initMovies(moviesEl, moreBtnEl);
  initMovieDetails(movieDetailEl);
  moviesEl.classList.remove('hidden');
  moreBtnContainerEl.classList.remove('hidden');
  footerEl.classList.remove('hidden');
  moviesEl.classList.remove('search');
}
