const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.more');
const searchBtn = document.querySelector('button#searching');
const movieA = document.querySelector('a');
const moviesListEl = document.querySelector('.movies-list');
const movieEl = document.querySelector('.movie-detail');

let page = 1;

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  renderMovies(movies);

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener('click', async () => {
    page += 1;
    const title = document.querySelector('input#searching').value;
    const year = document.querySelector('.year').value;
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
  const routePath = location.hash.substr(9);
  if (routePath === '') {
    console.log(routePath);
    const movies = await getMovies();
    renderMovies(movies);
  } else if (routePath.indexOf('#/detail/' >= 0)) {
    console.log(routePath);
    await getDetail();
  }
}

async function getDetail() {
  const id = location.hash.substr(9);
  const movie = await getMovie(id);
  renderMovie(movie);
}

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
async function getMovies(title = 'avengers', page = 1, year = '') {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`
  );
  const { Search: movies, totalResults } = await res.json();
  console.log(movies, totalResults);
  return movies;
}
// 영화목록 화면 출력하기
function renderMovies(movies) {
  movieEl.innerHTML = '';
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
    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;
    h1El.addEventListener('click', () => {
      console.log(movie.Title);
    });
    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;
    movieHash.append(h1El, imgEl);
    moviesEl.append(el);
  }
  moreBtnEl.style.display = 'block';
}

// 영화 상세정보 불러오기
async function getMovie(id) {
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

// 상세정보 화면출력
function renderMovie(movie) {
  moviesEl.innerHTML = '';
  movieEl.innerHTML = '';
  moreBtnEl.style.display = 'none';
  const el = document.createElement('div');
  el.classList.add('container');
  el.style.paddingTop = '100px';
  el.innerHTML = /* html */ `
    <div class='row justify-content-center'>
      <div class='col-4'>
        <img src="${movie.Poster}" />
      </div>
      <div class='col-6'>
        <h1 style=>${movie.Title}</h1>
        <p>${movie.Year} ${movie.Runtime} ${movie.Country}</p>
        <p>${movie.Plot}</p>
        <strong>Ratings</strong>
        <!-- <img scr='https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/Internet%20Movie%20Database.png' /> -->
        <p>${movie.Ratings[0].Value}${movie.Ratings[1].Value}${movie.Ratings[2].Value}</p>
        <strong>Actors</strong>
        <p>${movie.Actors}</p>
        <strong>Director</strong>
        <p>${movie.Director}</p>
        <strong>Production</strong>
        <p>${movie.Production}</p>
        <strong>Genre</strong>
        <p>${movie.Genre}</p>
      </div>
    </div>
    <button><a href=''>홈으로</a></button>
  `;
  movieEl.append(el);
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
