import { moviesEl, page as pg, moreBtnEl, movieDetailEl } from '../js/main.js';

// movie 리스트 초기화
export function initMovies() {
  let page = pg;
  moviesEl.innerHTML = '';
  // page 초기화
  page = 1;
  // 더보기 버튼 가리기
  moreBtnEl.classList.add('hidden');
}

// movie 상세페이지 초기화
export function initMovieDetails() {
  movieDetailEl.innerHTML = '';
}
