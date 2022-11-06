// import { getMovieInfo, renderMovieInfo } from '../js/movie.js';
import renderMovieDetail from '../js/renderMovieDetail.js';
import renderSearchPage from '../js/renderSearchPage.js';
import renderAboutPage from '../js/renderAboutPage.js';

// 초기화 코드
let inputId = '#tt2294629';
const bodyEl = document.querySelector('body');
export const moviesEl = document.querySelector('.movies');

export const moreBtnContainerEl = document.querySelector('.actions');
export const moreBtnEl = document.querySelector('.btn__more');
const moreLoadingEl = document.querySelector('#more-loading');

const searchFormEl = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const selectTypeEl = document.querySelector('.select-type');
const selectNumEl = document.querySelector('.select-num');
const selectYearEl = document.querySelector('.select-year');
export const movieDetailEl = document.querySelector('.movie-detail');

let mask;
// let loadingImgEl = document.querySelector('#loadingImg');

let title = searchInput.value || 'avengers';
export let page = 1;
let maxPage = -1;

// movie 리스트가 화면에 나타나게하는 함수
export function renderMovies(movies) {
  // movies 여러개를 가져와서 출력하기
  if (!movies) {
    alert('검색창에 영화를 입력해주세요!');
    return;
  }

  for (const movie of movies) {
    // console.log('movie : ', movie);
    const imdbID = movie.imdbID;
    const el = document.createElement('a');
    el.classList.add('movie');
    el.setAttribute('href', `/#${imdbID}`);
    el.dataset.id = movie.imdbID;

    // 고화질 이미지로 변경
    let hqPoster = movie.Poster.replace('SX300', 'SX700');

    const imgEl = document.createElement('img');
    imgEl.src = hqPoster;

    // Poster가 없을때, 대체이미지 넣어줌
    if (movie.Poster === 'N/A') {
      console.log('imgEl 안나옴!!!!!!!!!!!!!');
      imgEl.src = '../images/No-Image.png';
    }
    const infoEl = document.createElement('div');
    infoEl.classList.add('info');

    const yearEl = document.createElement('div');
    yearEl.classList.add('year');
    yearEl.textContent = movie.Year;

    const h2El = document.createElement('h2');
    h2El.textContent = movie.Title;

    infoEl.append(yearEl, h2El);

    el.append(imgEl, infoEl);
    moviesEl.append(el);
  }
  // more button 나타내기
  moreBtnContainerEl.classList.remove('.hidden');
}

// movie 클릭시 (hash change가 발생될 때), 해당 movie의 상세페이지 렌더링
// 해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener('hashchange', () => {
  const hashValue = location.hash.slice(1); // hashValue 받아옴
  if (hashValue === '') {
    renderSearchPage();
    // test
    moviesEl.classList.add('no-result');
    searchFormEl.classList.remove('hidden');
  } else if (hashValue === 'search') {
    renderSearchPage();
    searchFormEl.classList.remove('hidden');
    console.log('hashValue : search');
  } else if (hashValue === 'movie') {
    initMovies();
    initMovieDetails();
    searchFormEl.classList.add('hidden');
    console.log('hashValue : movie');
    if (inputId) {
      console.log('초기화 inputId');
      renderMovieDetail(inputId);
      console.log('inputId222:', inputId);
    }
    console.log('inputId: ', inputId);
  } else {
    // hash 값을 받은 경우
    console.log('해쉬로 상세페이지 렌더링');
    renderMovieDetail();
    searchFormEl.classList.add('hidden');
  }
});

// option 리스트 생성
for (let i = 2022; i > 1985; i--) {
  const optionEl = document.createElement('option');
  optionEl.value = i;
  optionEl.textContent = i;
  selectYearEl.append(optionEl);
}

// api 호출 함수
// 입력창에 keyword 입력시 해당 keyword에 해당하는 `영화들`을 가져옴
export async function getMovies(title = 'avengers', type = 'movie', page = 1, year = '') {
  const url = `https://omdbapi.com/?&apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`;
  const res = await fetch(url);
  const { Search: movies, totalResults } = await res.json();
  maxPage = Math.ceil(Number(totalResults) / 10);
  console.log(maxPage);
  if (page >= maxPage) {
    // 버튼 삭제
    moreBtnContainerEl.classList.add('hidden');
  }
  return movies;
}

// movie 리스트 초기화
export function initMovies() {
  moviesEl.innerHTML = '';
  // page 초기화
  page = 1;
  // 더보기 버튼 가리기
  moreBtnContainerEl.classList.add('hidden');
}

// movie 상세페이지 초기화
export function initMovieDetails() {
  movieDetailEl.innerHTML = '';
}

// 더보기 버튼 클릭시, 영화 리스트 10개씩 나옴
const addBtnMovies = async () => {
  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  // let year = selectYearEl.value === 'All Years' ? '' : selectYearEl.value;
  moreLoadingEl.classList.remove('hidden');
  page += 1;
  const movies = await getMovies(title, type, page, year);
  renderMovies(movies);
  moreLoadingEl.classList.add('hidden');
};
moreBtnEl.addEventListener('click', addBtnMovies);

// 검색 버튼 클릭시, input 값에 대한 영화 리스트 나옴
searchBtn.addEventListener('click', async (event) => {
  event.preventDefault(); // 새로고침 방지

  title = searchInput.value; // search-input 값 초기화

  searchInput.value = '';
  initMovies(); // movie 리스트 초기화
  initMovieDetails(); // movie 상세페이지 초기화

  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  let selectNum = selectNumEl.value;

  if (title) {
    const movies = await getMovies(title, type, page, year);
    renderMovies(movies);
    moreBtnContainerEl.classList.remove('hidden');
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

(() => {
  const io = new IntersectionObserver(
    (entry, observer) => {
      // 1. 현재 보이는 target 출력
      const ioTarget = entry[0].target;
      // 2. viewport에 target이 보이면 하는 일
      if (entry[0].isIntersecting) {
        console.log('현재 보이는 타켓', ioTarget);
        // 3. 현재 보이는 target 감시
        io.observe(moreBtnContainerEl);
        // 4. 더보기버튼함수 실행
        addBtnMovies();
      }
    },
    {
      // 5. 타겟이 90% 이상 보이면 실행
      threshold: 0.9,
    }
  );
  io.observe(moreBtnContainerEl);
})();
