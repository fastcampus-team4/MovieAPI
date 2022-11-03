// // 영화 상세정보 불러오기
// export async function getMovie() {
//   const id = location.hash.substr(9) ? location.hash.substr(9) : 'tt2294629';
//   const res = await fetch(
//     `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
//   );
//   const json = await res.json();
//   if (json.Response === 'True') {
//     console.log(json);
//     return json;
//   }
//   return json.Error;
// }

// const moviesListEl = document.querySelector('.movies-list');
// const movieDetailEl = document.querySelector('.movie-detail');
// const searchEl = document.querySelector('.search');

// const poster = document.querySelector('.poster');
// const titleInfo = document.querySelector('.title-info');
// const info = document.querySelector('.info');
// const plot = document.querySelector('.plot');
// const ratings = document.querySelector('.ratings');
// const actors = document.querySelector('.actors');
// const director = document.querySelector('.director');
// const production = document.querySelector('.production');
// const genre = document.querySelector('.genre');

// // 상세정보 화면출력
// export function renderMovie(movie) {
//   moviesListEl.style.display = 'none';
//   searchEl.style.display = 'none';
//   movieDetailEl.style.display = 'block';

//   poster.src =
//     movie.Poster === 'N/A'
//       ? poster.src
//       : movie.Poster.replace('SX300', 'SX700');

//   titleInfo.textContent = movie.Title;

//   info.textContent = `${movie.Year}  ▪  ${movie.Runtime}  ▪  ${movie.Country}`;

//   plot.textContent = movie.Plot;

//   ratings.innerHTML = '';
//   for (let i = 0; i < movie.Ratings.length; i++) {
//     const imgEl = document.createElement('img');
//     imgEl.src = `./img/${movie.Ratings[i].Source}.png`;
//     const spanEl = document.createElement('span');
//     spanEl.textContent = `${movie.Ratings[i].Value}`;
//     ratings.append(imgEl, spanEl);
//   }

//   actors.textContent = movie.Actors;

//   director.textContent = movie.Director;

//   production.textContent = movie.Production;

//   genre.textContent = movie.Genre;
// }
