// movie 리스트 초기화
export function initMovies(page, moviesEl, moreBtnEl) {
  moviesEl.innerHTML = '';
  page.value = 1; // page 초기화
  moreBtnEl.classList.add('hidden'); // 더보기 버튼 가리기
}

// movie 상세페이지 초기화
export function initMovieDetails(movieDetailEl) {
  movieDetailEl.innerHTML = '';
}
