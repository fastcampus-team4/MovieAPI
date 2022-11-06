const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.more');
const searchBtn = document.querySelector('button#searching');
const movieA = document.querySelector('a');
const moviesListEl = document.querySelector('.movies-list');
const movieDetailEl = document.querySelector('.movie-detail');
const searchEl = document.querySelector('.search');
const searchInputEl = document.querySelector('input#searching');
const loadingSpin = document.querySelector('.spinner-border');
const moreLoadingSpin = document.querySelector('.spinner-grow');
const alertThingsEl = document.querySelector('.alert_things');
const textEl = document.querySelector('.text');
const footerEl = document.querySelector('footer');
const detailLoadingSpin = document.querySelector('.detail-loading');

let title = '';
let page = 1;

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  renderMovies(movies);

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener('click', moreList);

  // 검색 버튼 클릭
  searchBtn.addEventListener('click', renderSearchList);

  // 영화포스터 클릭(상세정보)
  window.addEventListener('hashchange', router);
})();

// 해시변경시 불러올 화면 구분
async function router() {
  const routePath = location.hash;
  // console.log(routePath);
  // console.log(routePath.indexOf('#/detail'));
  if (routePath === '') {
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
  footerEl.style.display = 'block';
  movieDetailEl.style.display = 'none';

  if (movies === undefined) {
    console.log('movies가 언디파인드');
    moviesEl.innerHTML = '';
    textEl.classList.remove('hidden'); // 언디파인드면 목록 지우고 초기화면 텍스트 띄우기
    return;
  }

  for (const movie of movies) {
    // 목록이 있다면 포스터와 영화제목 가져와서 append
    const el = document.createElement('div');
    const movieHash = document.createElement('a');
    movieHash.href = `#/detail/${movie.imdbID}`;
    el.append(movieHash);
    el.classList.add('movie');

    const divEl = document.createElement('div');
    divEl.textContent = movie.Title;
    divEl.classList.add('text-truncate');
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

// 영화제목 검색했을 때 화면출력
async function renderSearchList() {
  if (moviesEl) {
    // 이전 검색목록 지우기
    moviesEl.innerHTML = '';
  }

  textEl.classList.add('hidden');
  loadingSpin.classList.remove('hidden');
  page = 1;
  page = document.querySelector('.paging').value;

  title = searchInputEl.value;
  searchInputEl.value = null;

  const year = document.querySelector('.year').value;

  console.log(title);
  console.log(page);

  for (i = 1; i <= page; i++) {
    const movies = await getMovies(title, i, year);
    if (!movies) {
      if (!title) {
        alert('제목을 입력해 주세요.');
      }
      loadingSpin.classList.add('hidden');
      // textEl.classList.remove('hidden');
      return;
    }
    renderMovies(movies);
  }

  loadingSpin.classList.add('hidden');
}

// 목록 더 불러오기
async function moreList() {
  // 초기화면 무한스크롤 적용시 그냥 리턴되게
  if (title === '') return;

  moreLoadingSpin.classList.remove('hidden');
  page++;
  const year = document.querySelector('.year').value;
  console.log(page, title, year);
  const movies = await getMovies(title, page, year);
  moreLoadingSpin.classList.add('hidden');
  if (!movies) {
    // 더이상 목록, 페이지가 없을 때
    console.log(title, page, year, movies);
    alert('더 이상 불러올 목록이 없습니다.');
  } else {
    console.log(movies);
    renderMovies(movies);
  }
}

const realInfo = document.querySelectorAll('.real-info');
const skeletons = document.querySelectorAll('.skeletons');

// 영화 상세정보 불러오기
async function getMovie() {
  // 불필요한 화면 지우고 로딩애니메이션/ 스켈레톤ui 띄우기
  moviesListEl.style.display = 'none';
  footerEl.style.display = 'none';
  searchEl.style.display = 'none';
  realInfo.forEach((ele) => (ele.style.display = 'none'));
  movieDetailEl.style.display = 'block';
  detailLoadingSpin.classList.remove('hidden');
  skeletons.forEach((ele) => ele.classList.remove('hidden'));
  // 영화 id값 가져오기
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
const titleInfo = document.querySelector('.title-info');
const info = document.querySelector('.info');
const plot = document.querySelector('.plot');
const ratings = document.querySelector('.ratings');
const actors = document.querySelector('.actors');
const director = document.querySelector('.director');
const production = document.querySelector('.production');
const genre = document.querySelector('.genre');

// 상세정보 화면출력
function renderMovie(movie) {
  poster.src =
    movie.Poster === 'N/A'
      ? poster.src
      : movie.Poster.replace('SX300', 'SX700');

  titleInfo.textContent = movie.Title;

  info.textContent = `${movie.Year} ▪  ${movie.Runtime}  ▪  ${movie.Country}`;

  plot.textContent = movie.Plot;

  ratings.innerHTML = '';
  for (i = 0; i < movie.Ratings.length; i++) {
    const imgEl = document.createElement('img');
    imgEl.src = `./img/${movie.Ratings[i].Source}.png`;
    const spanEl = document.createElement('span');
    spanEl.textContent = `${movie.Ratings[i].Value}`;
    ratings.append(imgEl, spanEl);
  }

  actors.textContent = movie.Actors;

  director.textContent = movie.Director;

  production.textContent = movie.Production;

  genre.textContent = movie.Genre;

  realInfo.forEach((ele) => (ele.style.display = 'block'));
  detailLoadingSpin.classList.add('hidden');
  skeletons.forEach((ele) => ele.classList.add('hidden'));
}

// 개봉연도 선택지 만들기
for (i = 2022; i > 1984; i--) {
  const selectYear = document.querySelector('.year');
  const yearOpt = document.createElement('option');
  yearOpt.value = i;
  yearOpt.textContent = i;
  selectYear.append(yearOpt);
}

// 무한스크롤 구현

const bottom = document.querySelector('.bottom');

const callback = (entries) => {
  // console.log(entries);
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      console.log(entry);
      moreList();
    }
  });
};

const io = new IntersectionObserver(callback, { threshold: 0.3 });
io.observe(bottom);
