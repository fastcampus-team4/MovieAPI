import renderMovieDetail from '../js/renderMovieDetail.js';
import renderSearchPage from '../js/renderSearchPage.js';
import { initMovies, initMovieDetails } from '../js/initialization.js';
import renderMovies from '../js/renderMovies.js';
import getMovies from '../js/getMovies.js';

// 초기화 코드
const moviesEl = document.querySelector('.movies');

const moreBtnContainerEl = document.querySelector('.actions');
const moreBtnEl = document.querySelector('.btn__more');
const moreLoadingEl = document.querySelector('#more-loading');

const footerEl = document.querySelector('footer');

const searchFormEl = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const selectTypeEl = document.querySelector('.select-type');
const selectNumEl = document.querySelector('.select-num');
const selectYearEl = document.querySelector('.select-year');
const movieDetailEl = document.querySelector('.movie-detail');
const skeletonsEl = document.querySelector('.skeletons');

let inputId = '#tt2294629';
let infiniteScroll = false; // 무한스크롤 제어
let title = searchInput.value;
let page = 1;
// const page = { value: 1 }; // let page = 1;
let maxPage = -1;

// movie 클릭시 (hash change가 발생될 때), 해당 movie의 상세페이지 렌더링
// 해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener('hashchange', async () => {
  const hashValue = location.hash.replace('#', ''); // hashValue 받아옴
  // console.log('해쉬값:', hashValue);
  initMovies(moviesEl, moreBtnEl);
  if (hashValue === '') {
    // page = 1;
    // initMovies();
    // initMovieDetails(movieDetailEl);
    renderSearchPage(page, moreBtnEl, moviesEl, footerEl, moreBtnContainerEl, movieDetailEl);
    searchFormEl.classList.remove('hidden');
    infiniteScroll = false;
  } else if (hashValue === 'search') {
    // page = 1;
    renderSearchPage(page, moreBtnEl, moviesEl, footerEl, moreBtnContainerEl, movieDetailEl);
    footerEl.classList.remove('hidden');
    searchFormEl.classList.remove('hidden');
    infiniteScroll = false;
  } else if (hashValue === 'movie') {
    infiniteScroll = false;
    searchFormEl.classList.add('hidden');
    if (inputId) {
      renderMovieDetail(inputId, page, moviesEl, moreBtnEl, moreBtnContainerEl, skeletonsEl, movieDetailEl);
    }
    // console.log('inputId: ', inputId);
  } else {
    // hash 값을 받은 경우
    infiniteScroll = false;
    inputId = hashValue;
    renderMovieDetail(inputId, page, moviesEl, moreBtnEl, moreBtnContainerEl, skeletonsEl, movieDetailEl);
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

// 더보기 버튼 클릭시, 영화 리스트 10개씩 나옴
const addBtnMovies = async () => {
  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  moreLoadingEl.classList.remove('hidden');
  page += 1;

  const movies = await getMovies(title, type, page, year);
  maxPage = Math.ceil(Number(movies.total) / 10);

  // console.log('maxPage', maxPage);
  // console.log('page', page);

  renderMovies(moviesEl, movies, moreBtnEl);

  if (page >= maxPage) {
    console.log('last page!');
    moreBtnContainerEl.classList.add('hidden');
    infiniteScroll = false;
    return;
  }
  moreLoadingEl.classList.add('hidden');
};
moreBtnEl.addEventListener('click', addBtnMovies);

// 검색 버튼 클릭시, input 값에 대한 영화 리스트 나옴
searchBtn.addEventListener('click', async (event) => {
  event.preventDefault(); // 새로고침 방지

  page = 1;

  infiniteScroll = true; // 무한스크롤 작동 !!!!

  title = searchInput.value; // search-input 값 초기화

  searchInput.value = '';

  initMovies(moviesEl, moreBtnEl); // movie 리스트 초기화
  initMovieDetails(movieDetailEl); // movie 상세페이지 초기화

  let type = selectTypeEl.value;
  let year = selectYearEl.value;
  let selectNum = selectNumEl.value;

  if (title) {
    const movies = await getMovies(title, type, page, year);
    renderMovies(moviesEl, movies, moreBtnEl);
    // moreBtnEl.classList.remove('hidden');

    for (let i = 0; i < selectNum; i++) {
      addBtnMovies();
    }
  } else {
    alert('검색창에 영화를 입력해주세요!');
    // moviesEl.classList.remove('search');
  }
});

const io = new IntersectionObserver(
  (entry, observer) => {
    // 1. 현재 보이는 target 출력
    const ioTarget = entry[0].target;
    // 2. viewport에 target이 보이면 하는 일
    if (entry[0].isIntersecting && infiniteScroll) {
      // console.log('현재 보이는 타켓', ioTarget);
      // 3. 현재 보이는 target 감시
      io.observe(footerEl);
      // 4. 더보기버튼함수 실행
      addBtnMovies();
    }
  },
  {
    // 5. 타겟이 100% 보이면 실행
    threshold: 1,
  }
);
io.observe(footerEl);
