// 초기화 코드
const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.btn');

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const selectTypeEl = document.querySelector('.select-type');
const selectNumEl = document.querySelector('.select-num');
const selectYearEl = document.querySelector('.select-year');
const API_KEY = '7035c60c';
let title = searchInput.value;
let page = 1;

// https://omdbapi.com/?i=${movies.dataset.id}&apikey=7035c60

// 영화 id 1개로 영화 1개의 정보를 가져와서 (자세한) , 출력해라. < 오늘 목표
// movie 리스트가 화면에 나타나게하는 함수
async function renderMovies(movies) {
  // movies 여러개를 가져와서 출력하기. < 예전에 완성한거
  if (!movies) {
    alert('검색창에 영화를 입력해주세요!');
    return;
  }
  console.log('movies: ', movies);

  for (const movie of movies) {
    const el = document.createElement('a');
    el.classList.add('movie');
    el.setAttribute('href', 'movie.html');
    el.dataset.id = movie.imdbID;

    // const el = document.createElement('div');
    // el.classList.add('movie');
    // el.dataset.id = movie.imdbID;

    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;

    const h2El = document.createElement('h2');
    h2El.textContent = movie.Title;

    h2El.addEventListener('click', () => {
      console.log('movies.Title: ', movie.Title);
    });

    el.append(imgEl, h2El);
    moviesEl.append(el);
  }
}

// option 리스트 생성
for (let i = 2022; i > 1985; i--) {
  const optionEl = document.createElement('option');
  optionEl.value = i;
  optionEl.textContent = i;
  selectYearEl.append(optionEl);
}

// api 호출 함수
// 입력창에 keyword 입력시 해당 keyword에 해당하는 `영화들`을 가져옴
async function getMovies(title = 'avengers', type = 'movie', page = 1, year = '') {
  const url = `https://omdbapi.com/?&apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`;
  console.log(url);
  const res = await fetch(url);
  const { Search: movies } = await res.json();
  return movies;
}

// movie 리스트 초기화
function initMovies() {
  moviesEl.innerHTML = '';
  // page 초기화
  page = 1;
}

// 더보기 버튼 클릭시, 영화 리스트 10개씩 나옴
const addBtnMovies = async () => {
  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  page += 1;

  if (!title) {
    title = 'avengers';
  }
  console.log('title:', title);

  const movies = await getMovies(title, type, page, year);
  renderMovies(movies);
};
moreBtnEl.addEventListener('click', addBtnMovies);

// 검색 버튼 클릭시, input 값에 대한 영화 리스트 나옴
searchBtn.addEventListener('click', async (event) => {
  // 새로고침 방지
  event.preventDefault();

  title = searchInput.value;
  // search-input 값 초기화
  searchInput.value = '';
  initMovies();

  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  let selectNum = selectNumEl.value;

  console.log('type:', type);
  console.log('year:', year);
  console.log('selectNum:', selectNum);

  if (title) {
    const movies = await getMovies(title, type, page, year);
    renderMovies(movies);
    for (let i = 0; i < selectNum; i++) {
      console.log('more작동!!!!!!');
      addBtnMovies();
    }
  } else {
    alert('검색창에 영화를 입력해주세요!');
  }
});

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);
})();
