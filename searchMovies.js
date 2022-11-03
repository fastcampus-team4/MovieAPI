// let title = '';
// let page = 1;

// // 검색목록 화면출력
// export async function renderSearchList() {
//   console.log('화면출력');
//   moviesEl.innerHTML = '';
//   const searchInputEl = document.querySelector('input#searching');
//   // const title = searchInputEl.value;
//   title = searchInputEl.value;
//   page = document.querySelector('.paging').value;
//   const year = document.querySelector('.year').value;
//   console.log(title);
//   console.log(page);
//   // if (title === '') {
//   //   alert('제목을 입력해 주세요.');
//   // } else {
//   for (let i = 1; i <= page; i++) {
//     const movies = await getMovies(title, i, year);
//     renderMovies(movies);
//   }
//   // }
//   searchInputEl.value = null;
//   console.log(title);
// }

// // 영화목록 불러오기
// export async function getMovies(title = '', page = 1, year = '') {
//   const res = await fetch(
//     `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`
//   );
//   const { Search: movies, totalResults } = await res.json();
//   console.log(movies, totalResults);
//   return movies;
// }

// const moviesEl = document.querySelector('.movies');
// const moviesListEl = document.querySelector('.movies-list');
// const movieDetailEl = document.querySelector('.movie-detail');
// const searchEl = document.querySelector('.search');
// const searchInputEl = document.querySelector('input#searching');

// // 영화목록 화면 출력하기
// export function renderMovies(movies) {
//   console.log('목록화면 출력');
//   const searchInputEl = document.querySelector('input#searching');
//   moviesListEl.style.display = 'block';
//   searchEl.style.display = 'flex';
//   movieDetailEl.style.display = 'none';

//   if (movies === undefined) {
//     moviesEl.innerHTML = '';
//     console.log('movies가 언디파인드');
//     const el = document.createElement('div');
//     el.classList.add('alert');
//     el.textContent = 'Search for the movie title !';
//     moviesEl.append(el);
//     return;
//   }
//   for (const movie of movies) {
//     const el = document.createElement('div');
//     const movieHash = document.createElement('a');
//     movieHash.href = `#/detail/${movie.imdbID}`;
//     el.append(movieHash);
//     el.classList.add('movie');
//     // <div class="movie"></div>

//     // Type 1
//     // el.innerHTML = /* html */ `
//     //   <h1>${movie.Title}</h1>
//     //   <img src="${movie.Poster}" />
//     // `
//     // const h1El = el.querySelector('h1')
//     // h1El.addEventListener('click', () => {
//     //   console.log(movie.Title)
//     // })

//     // Type 2
//     const divEl = document.createElement('div');
//     divEl.textContent = movie.Title;
//     divEl.addEventListener('click', () => {
//       console.log(movie.Title);
//     });
//     const imgEl = document.createElement('img');
//     imgEl.src =
//       movie.Poster === 'N/A'
//         ? `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019`
//         : movie.Poster;
//     movieHash.append(imgEl, divEl);
//     moviesEl.append(el);
//   }
// }
