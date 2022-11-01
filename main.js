const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.more');
const searchBtn = document.querySelector('button#searching');
const movieA = document.querySelector('a');
const moviesListEl = document.querySelector('.movies-list');
const movieDetailEl = document.querySelector('.movie-detail');
const searchEl = document.querySelector('.search');

let page = 1;

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  renderMovies(movies);

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener('click', async () => {
    page += 1;
    console.log(page);
    const title = document.querySelector('input#searching').value;
    console.log(title);
    const year = document.querySelector('.year').value;
    console.log(year);
    const movies = await getMovies(title, page, year);
    console.log(movies);
    renderMovies(movies);
  });

  // 검색 버튼 클릭
  searchBtn.addEventListener('click', renderSearchList);

  // 영화포스터 클릭(상세정보)
  window.addEventListener('hashchange', router);
})();

async function router() {
  const routePath = location.hash;
  // console.log(routePath);
  // console.log(routePath.indexOf('#/detail'));
  if (routePath === '') {
    console.log(routePath);
    const movies = await getMovies();
    renderMovies(movies);
  } else if (routePath.indexOf('#/detail') >= 0) {
    console.log(routePath);
    const movie = await getMovie();
    renderMovie(movie);
  } else if (routePath.indexOf('#/search') >= 0) {
    const movies = await getMovies();
    renderMovies(movies);
  }
}

// async function getDetail() {
//   const movie = await getMovie();
//   renderMovie(movie);
// }

// 검색목록 화면출력
async function renderSearchList() {
  moviesEl.innerHTML = '';
  const title = document.querySelector('input#searching').value;
  const page = document.querySelector('.paging').value;
  const year = document.querySelector('.year').value;
  console.log(title);
  console.log(page);
  if (title === '') {
    alert('제목을 입력해 주세요.');
  } else {
    for (i = 1; i <= page; i++) {
      const movies = await getMovies(title, i, year);
      renderMovies(movies);
    }
  }
}

// 영화목록 불러오기
async function getMovies(title = '', page = 1, year = '') {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`
  );
  const { Search: movies, totalResults } = await res.json();
  console.log(movies, totalResults);
  return movies;
}
// 영화목록 화면 출력하기
function renderMovies(movies) {
  console.log('목록화면 출력');
  moviesListEl.style.display = 'block';
  searchEl.style.display = 'flex';
  movieDetailEl.style.display = 'none';

  if (movies === undefined) {
    moviesEl.innerHTML = '';
    console.log('movies가 언디파인드');
    const el = document.createElement('div');
    el.classList.add('alert');
    el.textContent = 'Search for the movie title !';
    moviesEl.append(el);
    return;
  }
  for (const movie of movies) {
    const el = document.createElement('div');
    const movieHash = document.createElement('a');
    movieHash.href = `#/detail/${movie.imdbID}`;
    el.append(movieHash);
    el.classList.add('movie');
    // <div class="movie"></div>

    // Type 1
    // el.innerHTML = /* html */ `
    //   <h1>${movie.Title}</h1>
    //   <img src="${movie.Poster}" />
    // `
    // const h1El = el.querySelector('h1')
    // h1El.addEventListener('click', () => {
    //   console.log(movie.Title)
    // })

    // Type 2
    const divEl = document.createElement('div');
    divEl.textContent = movie.Title;
    divEl.addEventListener('click', () => {
      console.log(movie.Title);
    });
    const imgEl = document.createElement('img');
    imgEl.src =
      movie.Poster === 'N/A'
        ? `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019`
        : movie.Poster;
    movieHash.append(imgEl, divEl);
    moviesEl.append(el);
  }
}

// 영화 상세정보 불러오기
async function getMovie() {
  const id = location.hash.substr(9) ? location.hash.substr(9) : 'tt2294629';
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  if (json.Response === 'True') {
    console.log(json);
    return json;
  }
  return json.Error;
}

const poster = document.querySelector('.poster');
const title = document.querySelector('.title');
const info = document.querySelector('.info');
const plot = document.querySelector('.plot');
const ratings = document.querySelector('.ratings');
const actors = document.querySelector('.actors');
const director = document.querySelector('.director');
const production = document.querySelector('.production');
const genre = document.querySelector('.genre');

// 상세정보 화면출력
function renderMovie(movie) {
  moviesListEl.style.display = 'none';
  searchEl.style.display = 'none';
  movieDetailEl.style.display = 'block';

  poster.src = movie.Poster === 'N/A' ? poster.src : movie.Poster;

  title.textContent = movie.Title;

  info.textContent = `${movie.Year} ▪ ${movie.Runtime} ▪ ${movie.Country}`;

  plot.textContent = movie.Plot;

  // ratings.textContent = `Internet Movie Database: ${movie.Ratings[0].Value} Rotten Tomatoes: ${movie.Ratings[1].Value} Metacritic: ${movie.Ratings[2].Value}`;

  actors.textContent = movie.Actors;

  director.textContent = movie.Director;

  production.textContent = movie.Production;

  genre.textContent = movie.Genre;
}

// // 목록갯수 선택(어느페이지까지 불러올지)
// function selectedPage(paging) {
//   page = paging.value;
//   console.log(page);
// }

// // 개봉연도 선택
// function selectedYear(selectYear) {
//   year = selectYear.value;
//   console.log(year);
// }

// 개봉연도 선택지 만들기
for (i = 2022; i > 1984; i--) {
  const selectYear = document.querySelector('.year');
  const yearOpt = document.createElement('option');
  yearOpt.value = i;
  yearOpt.textContent = i;
  selectYear.append(yearOpt);
}
