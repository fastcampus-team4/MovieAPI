// movie 리스트 초기화
export function initMovies(moviesEl, moreBtnEl) {
  moviesEl.innerHTML = '';
  moreBtnEl.classList.add('hidden'); // 더보기 버튼 가리기
}

// movie 상세페이지 초기화
export function initMovieDetails(movieDetailEl) {
  movieDetailEl.innerHTML = '';
}
