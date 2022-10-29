// 초기화 코드
const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.btn');

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const selectTypeEl = document.querySelector('.select-type');
const selectNumEl = document.querySelector('.select-num');
const selectYearEl = document.querySelector('.select-year');

let title = searchInput.value;
let page = 1;

// movie 리스트가 화면에 나타나게하는 함수
function renderMovies(movies) {
  if (!movies) {
    alert('검색창에 영화를 입력해주세요!');
    return;
  }
  console.log('movies: ', movies);
  for (const movie of movies) {
    const el = document.createElement('div');
    el.classList.add('movie');

    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;
    h1El.addEventListener('click', () => {
      console.log('movies.Title: ', movie.Title);
    });
    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;
    el.append(imgEl, h1El);

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
async function getMovies(title = 'avengers', type = 'movie', page = 1, year = '') {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`);
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
