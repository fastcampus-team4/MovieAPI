import { initMovies, movieDetailEl, moreBtnEl } from '../js/main.js';
// import { getMovieInfo } from '../js/movie.js';

export async function getMovieInfo(id = 'tt1285016') {
  // id로 url 입력해서, 가져와라 정보를
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}`);
  const movieInfo = await res.json();
  return movieInfo;
}

export default async function renderMovieDetail(inputId) {
  console.log('renderMovieDetail 함수 실행!');
  let id;
  let movieInfo;
  // moreBtnEl.classList.add('hidden');

  initMovies(); // movie 리스트 초기화

  if (!inputId) {
    id = location.hash.slice(1); // id 받아옴
    console.log('id받아옴~~!!');
  } else {
    console.log('typeof: ', typeof inputId);
    id = inputId.slice(1);
  }
  movieInfo = await getMovieInfo(id);

  console.log('movieInfo:', movieInfo);

  const { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre } = movieInfo;
  console.log(Poster);
  movieDetailEl.innerHTML = /*html*/ `
      <div class="movie-container">
        <img src="${Poster}" class="poster" />
        <div class="movie-info">
          <h1>${Title}</h1>
          <div class="short-info">
            <span class="released">${Released}</span>
            <span class="runtime">${Runtime}</span>
            <span class="country">${Country}</span>
          </div>
          <div class="ratings-box">
            <h3>Ratings</h3>
            <div class="ratings">
              <span class="rating">${Ratings[0].Source} : ${Ratings[0].Value} </span>
              <span class="rating">${Ratings[1].Source} : ${Ratings[1].Value} </span>
              <span class="rating">${Ratings[2].Source} : ${Ratings[2].Value} </span>
            </div>
          </div>
          <div class="plot">${Plot}</div>
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
  return movieInfo;
}
