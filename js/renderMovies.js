// movie 리스트가 화면에 나타나게하는 함수
export default function renderMovies(moviesEl, movies, moreBtnEl) {
  moviesEl.classList.add('search');
  // movies 여러개를 가져와서 출력하기
  if (!movies) {
    console.log('영화가 존재하지 않음');
    return;
  }
  if (movies.movies === undefined) {
    alert('영화가 존재하지 않음');
    moviesEl.classList.remove('search');
    moreBtnEl.classList.add('hidden');
    return;
  }
  for (const movie of movies.movies) {
    moreBtnEl.classList.remove('hidden');
    const imdbID = movie.imdbID;
    const el = document.createElement('a');
    el.classList.add('movie');
    el.setAttribute('href', `/#${imdbID}`);
    el.dataset.id = movie.imdbID;

    // 고화질 이미지로 변경
    let hqPoster = movie.Poster.replace('SX300', 'SX700');

    const imgEl = document.createElement('img');
    imgEl.src = hqPoster;

    // Poster가 없을때, 대체이미지 넣어줌
    if (movie.Poster === 'N/A') {
      // console.log('imgEl 안나옴!!!!!!!!!!!!!');
      imgEl.src = '../images/No-Image.png';
    }
    const infoEl = document.createElement('div');
    infoEl.classList.add('info');

    const yearEl = document.createElement('div');
    yearEl.classList.add('year');
    yearEl.textContent = movie.Year;

    const h2El = document.createElement('h2');
    h2El.textContent = movie.Title;

    infoEl.append(yearEl, h2El);

    el.append(imgEl, infoEl);
    moviesEl.append(el);
  }
  moreBtnEl.classList.remove('hidden');
}
