// 초기화 코드
const moviesEl = document.querySelector(".movies");
const moreBtnEl = document.querySelector(".more-btn");
const searchBtn = document.querySelector(".search-btn");
const selectYear = document.querySelector("#select-year");
const bodyEl = document.querySelector("body");
const searchYearEl = document.getElementById("select-year");
const movieDetailEl = document.querySelector(".movie-detail");
let inputID = "tt2294629";

let page = 1;

(async () => {
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);
  const movieEl = document.querySelector(".movie");
})();

//더보기 버튼
moreBtnEl.addEventListener("click", async () => {
  //전역변수로 선언하는 것보다 지역변수로 선언하는 것이 더 직관적입니다
  let title = document.querySelector(".input-search").value || "frozen";
  let year = selectYear.value;
  const movies = await getMovies(page, title, year);
  page += 1;
  renderMovies(movies);
});

//반복문으로 영화 연도 생성
for (let i = 2022; i >= 1985; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  searchYearEl.append(optionEl);
}

//영화 제목 검색
searchBtn.addEventListener("click", async function (event) {
  page = 1;
  //form의 기본값은 submit이라 페이지가 새로고침 되는 것을 방지하기 위해
  event.preventDefault();

  moviesEl.innerHTML = "";
  let title = document.querySelector(".input-search").value || "frozen";
  let year = selectYear.value;
  if (title === "") {
    alert("제목을 입력해주세요.");
  } else {
    const movies = await getMovies(page, title, year);
    renderMovies(movies);
  }
});

// 영화 정보 가져오기
async function getMovies(page = "", title = "frozen", year = "") {
  const url = `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`;
  const res = await fetch(url);
  const { Search: movies } = await res.json();
  return movies;
}

// 영화 정보 화면에 출력
function renderMovies(movies) {
  if (!movies) {
    // movies === undefined 거나 null
    console.log("movies가 존재하지 않습니다.");
    return;
  } else {
    for (const movie of movies) {
      //개별 영화가 <a>태그로 감싸져 있기 때문에 영화를 클릭하면 상세 정보 페이지로 이동
      const imdbID = movie.imdbID;
      const aTag = document.createElement("a");
      aTag.setAttribute("href", `/#${imdbID}`);

      const el = document.createElement("div");
      el.classList.add("movie");

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      el.append(h1El, imgEl);
      aTag.append(el);
      moviesEl.append(aTag);
    }
  }
}

//단일 영화 상세 정보 가져오기
async function getMovieDetail(id = "tt2294629") {
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`;
  const res = await fetch(url);
  const movieInfo = await res.json();
  return movieInfo;
}

//단일 영화 상세 페이지 출력
async function renderMovieDetail(inputID) {
  let id;
  let movieInfo;

  //초기화 : 싹지우기
  moviesEl.innerHTML = "";
  movieDetailEl.innerHTML = "";
  page = 1;
  moreBtnEl.classList.add("hidden");

  if (!inputID) {
    id = location.hash.slice(1); //#빼고 뒤에 있는 숫자 가져와라
  } else {
    id = inputID;
  }
  console.log("id값 : ", id);
  movieInfo = await getMovieDetail(id);
  console.log(movieInfo);

  const mvCon = document.createElement("div");
  mvCon.innerHTML = /*html*/ `
  <img src="${movieInfo.Poster}" />
  <h1>${movieInfo.Title}</h1>
  <p>${movieInfo.plot}</p>`;

  movieDetailEl.append(mvCon);
}

// 영화 선택 시 상세 정보 페이지로 넘어가기
window.addEventListener("hashchange", async function () {
  // 먼저 다지우고
  // 랜더링
  renderMovieDetail();
});
