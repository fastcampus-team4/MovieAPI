// import { getMovieInfo, renderMovieInfo } from '../js/movie.js';
import renderMovieDetail from '../js/renderMovieDetail.js';
import renderSearchPage from '../js/renderSearchPage.js';
import renderAboutPage from '../js/renderAboutPage.js';

// 초기화 코드
let inputId = '#tt2294629';
const bodyEl = document.querySelector('body');
const moviesEl = document.querySelector('.movies');
export const moreBtnEl = document.querySelector('.btn__more');

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const selectTypeEl = document.querySelector('.select-type');
const selectNumEl = document.querySelector('.select-num');
const selectYearEl = document.querySelector('.select-year');
export const movieDetailEl = document.querySelector('.movie-detail');

const API_KEY = '7035c60c';
let title = searchInput.value || 'avengers';
export let page = 1;

// movie 리스트가 화면에 나타나게하는 함수
export function renderMovies(movies) {
  // movies 여러개를 가져와서 출력하기
  if (!movies) {
    console.log('검색창에 영화를 입력해주세요!');
    return;
  }
  // console.log('movies: ', movies);

  for (const movie of movies) {
    // console.log('movie : ', movie);
    const imdbID = movie.imdbID;
    const el = document.createElement('a');
    el.classList.add('movie');
    el.setAttribute('href', `/#${imdbID}`);
    el.dataset.id = movie.imdbID;

    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;

    // Poster가 없을때, 대체이미지 넣어줌
    if (movie.Poster === 'N/A') {
      console.log('imgEl 안나옴!!!!!!!!!!!!!');
      imgEl.src = '../images/No-Image.png';
    }
    // Poster가 없을때, 대체이미지 넣어줌 -> 배포할땐 안됨!
    // if (imgEl.src === 'http://127.0.0.1:5500/N/A') {
    //   console.log('imgEl 안나옴!!!!!!!!!!!!!');
    //   imgEl.src = '../images/No-Image.png';
    // }

    const h2El = document.createElement('h2');
    h2El.textContent = movie.Title;

    el.append(imgEl, h2El);
    moviesEl.append(el);
  }
}

// movie 클릭시 (hash change가 발생될 때), 해당 movie의 상세페이지 렌더링
// 해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener('hashchange', () => {
  const hashValue = location.hash.slice(1); // hashValue 받아옴
  if (hashValue === '') {
    renderSearchPage();
  } else if (hashValue === 'search') {
    renderSearchPage();
    console.log('hashValue : search');
  } else if (hashValue === 'movie') {
    initMovies();
    // initMovieDetails();
    console.log('movie로 이동~~!!');
    console.log('hashValue : movie');
    if (inputId) {
      console.log('hashValue === movie일때');
      renderMovieDetail(inputId);
      console.log('inputId222:', inputId);
    }
    console.log('inputId: ', inputId);
  } else if (hashValue === 'about') {
    renderAboutPage();
    console.log('hashValue : about');
  } else {
    // hash 값을 받은 경우
    console.log('해쉬로 상세페이지 렌더링');
    renderMovieDetail();
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
  const { Search: movies, totalResult } = await res.json();
  return movies;
}

// movie 리스트 초기화
export function initMovies() {
  moviesEl.innerHTML = '';
  // page 초기화
  page = 1;
}

// movie 상세페이지 초기화
export function initMovieDetails() {
  movieDetailEl.innerHTML = '';
}

// 더보기 버튼 클릭시, 영화 리스트 10개씩 나옴
const addBtnMovies = async () => {
  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  page += 1;

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
  initMovies(); // movie 리스트 초기화
  initMovieDetails(); // movie 상세페이지 초기화

  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  let selectNum = selectNumEl.value;

  // console.log('type:', type);
  // console.log('year:', year);
  // console.log('selectNum:', selectNum);
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
