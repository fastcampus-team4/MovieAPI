import { initMovies } from '../js/initialization.js';

export async function getMovieInfo(id = 'tt1285016') {
  // id로 url 입력해서, 영화 상세 정보를 가져오기!
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}`);
  const movieInfo = await res.json();
  return movieInfo;
}

export default async function renderMovieDetail(
  inputId,
  page,
  moviesEl,
  moreBtnEl,
  moreBtnContainerEl,
  skeletonsEl,
  movieDetailEl
) {
  skeletonsEl.classList.remove('hidden');
  moviesEl.classList.add('hidden');
  moreBtnContainerEl.classList.add('hidden');

  let id;
  let movieInfo;

  initMovies(moviesEl, moreBtnEl); // movie 리스트 초기화

  if (!inputId) {
    id = location.hash.replace('#', ''); // id 받아옴
  } else {
    id = inputId.replace('#', '');
  }

  movieInfo = await getMovieInfo(id);

  let { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre } = movieInfo;

  let hqPoster = Poster.replace('SX300', 'SX700');

  // Poster가 없을때, 대체이미지 넣어줌
  if (Poster === 'N/A') {
    hqPoster = '../images/No-Image.png';
  }

  // Ratings 이미지 및 텍스트 보여줌
  let ratings = '';
  for (let i = 0; i < Ratings.length; i++) {
    ratings += `<div class="rating ${i + 1}"><img src="../images/${Ratings[i].Source}.png"/><span class="rating-name">${
      Ratings[i].Value
    }</span></div>`;
  }

  movieDetailEl.innerHTML = /*html*/ `
      <div class="movie-container">
        <div class="poster">
          <img src="${hqPoster}" class="poster" />
        </div>
        <div class="specs">
          <h1 class="title">${Title}</h1>
          <div class="labels">
            <span class="released">${Released}</span>
            <span class="runtime">${Runtime}</span>
            <span class="country">${Country}</span>
          </div>
          <div class="plot">${Plot}</div>
          <div class="ratings-box">
            <h3>Ratings</h3>
            <div class="ratings">
              ${ratings}
            </div>
          </div>
          <div class="director-box">
            <h3>Director</h3>
            <div class="director">${Director}</div>
          </div>
          <div class="actors-box">
            <h3>Actors</h3>
            <div class="actors">${Actors}</div>
          </div>
          <div class="type-box">
            <h3>Genre</h3>
            <div class="type">${Genre}</div>
          </div>
        </div>
      </div>
    `;
  skeletonsEl.classList.add('hidden');
}
