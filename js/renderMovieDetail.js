import { movieDetailEl, moreBtnContainerEl, moviesEl, footerEl } from '../js/main.js';
import { initMovies } from '../js/initialization.js';

const skeletonsEl = document.querySelector('.skeletons');

export async function getMovieInfo(id = 'tt1285016') {
  // id로 url 입력해서, 가져와라 정보를
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}`);
  const movieInfo = await res.json();
  return movieInfo;
}

export default async function renderMovieDetail(inputId) {
  console.log('renderMovieDetail 함수 실행!');
  skeletonsEl.classList.remove('hidden');
  moviesEl.classList.add('hidden');
  moreBtnContainerEl.classList.add('hidden');
  // footerEl.classList.add('hidden');

  let id;
  let movieInfo;

  initMovies(); // movie 리스트 초기화

  if (!inputId) {
    id = location.hash.slice(1); // id 받아옴
    console.log('id받아옴~~!!');
  } else {
    console.log('typeof: ', typeof inputId);
    id = inputId.slice(1);
  }

  movieInfo = await getMovieInfo(id);

  // console.log('movieInfo:', movieInfo);

  let { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre } = movieInfo;

  let hqPoster = Poster.replace('SX300', 'SX700');
  console.log('고화질 Poster:', Poster);

  // Poster가 없을때, 대체이미지 넣어줌
  if (Poster === 'N/A') {
    console.log('상세페이지 img 안나옴!!!!!!!!!!!!!');
    hqPoster = '../images/No-Image.png';
  }

  // Ratings 이미지 및 텍스트 보여줌
  let ratings = '';
  for (let i = 0; i < Ratings.length; i++) {
    console.log(i);
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
