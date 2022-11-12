// 초기화 코드
const moviesEl = document.querySelector(".movies");
const moreBtnEl = document.querySelector(".more-btn");
const inputSearch = document.querySelector(".input-search");
const searchBtn = document.querySelector(".search-btn");
const selectYear = document.getElementById("select-year");
const selectGenre = document.getElementById("select-genre");
const selectNumber = document.getElementById("select-number");
const bodyEl = document.querySelector("body");
const movieDetailEl = document.querySelector(".movie-detail");
const loadingEl = document.querySelector(".loader-containter");
const displayBox = document.querySelector(".display-box");
let infiniteScroll = false; //저절로 moreBtn을 작동시키는 것 search버튼을 눌렀을 때만 작동되도록

let inputID = "tt2294629";
let page = 1;

(async () => {
  const movies = await getMovies();
  page += 1;
  // 이걸 주석처리하면 빈화면이 나와야 한다고 생각하는데 그렇지 않음. 이유가 뭘까?
  /* renderMovies(movies);
  const movieEl = document.querySelector(".movie"); */
})();

//더보기 버튼 핸들러
const handleMoreBtn = async () => {
  //전역변수로 선언하는 것보다 지역변수로 선언하는 것이 더 직관적입니다
  console.log("selectNumber.value : ", selectNumber.value);
  page += 1;
  //page = selectNumber.value || 1;
  let title = inputSearch.value || "frozen";
  let year = selectYear.value;
  let genre = selectGenre.value;
  console.log("moreBtn 작동", page, title, year, genre);
  const movies = await getMovies(page, title, year, genre);
  renderMovies(movies);
};

//무한 스크롤
const detectBottom = () => {
  //스크롤 되어 내려온 위치
  let scrollTop = document.documentElement.scrollTop;
  //브라우저에 표시된 높이
  let innerHeight = window.innerHeight;
  //페이지 전체 높이
  let bodyScrollHeight = document.body.scrollHeight;

  if (scrollTop + innerHeight >= bodyScrollHeight) {
    return true;
  } else {
    return false;
  }
};

window.addEventListener(
  "scroll",
  _.throttle(() => {
    if (detectBottom() && infiniteScroll) {
      // 최하단에 도착하면 more 버튼 작동!
      console.log("more 작동!");
      handleMoreBtn();
    }
  }, 1000)
);

//더보기 버튼
moreBtnEl.addEventListener("click", handleMoreBtn);

//반복문으로 영화 연도 생성
for (let i = 2022; i >= 1985; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  selectYear.append(optionEl);
}
//검색 기능
const handleSearchBtn = async (event) => {
  infiniteScroll = true;
  page = 1;
  //form의 기본값은 submit이라 페이지가 새로고침 되는 것을 방지하기 위해
  //event.preventDefault();

  moviesEl.innerHTML = "";
  let title = document.querySelector(".input-search").value || "frozen";
  let year = selectYear.value || "";
  let genre = selectGenre.value || "movie";
  console.log(
    `검색버튼 작동! title:${title} year:${year} genre:${genre} page:${page}`
  );
  const movies = await getMovies(page, title, year, genre);
  console.log(`movies: ${movies}`);
  renderMovies(movies);
  //영화 갯수 선택
  console.log("핸들서치버튼 클릭, selectNumber.value", selectNumber.value);
  if (selectNumber.value === 20) {
    handleMoreBtn();
  }
  if (selectNumber.value === 30) {
    handleMoreBtn();
    handleMoreBtn();
  }
};

searchBtn.addEventListener("click", handleSearchBtn);

//엔터키
// inputSearch.addEventListener("keyup", (e) => {
//   if (e.keyCode === 13) {
//     e.preventDefault();
//     handleSearchBtn();
//   }
// });

//영화 제목 검색
/* searchBtn.addEventListener("click", async function (event) {
  page = 1;
  //form의 기본값은 submit이라 페이지가 새로고침 되는 것을 방지하기 위해
  event.preventDefault();

  moviesEl.innerHTML = "";
  let title = document.querySelector(".input-search").value || "frozen";
  let year = selectYear.value;
  let genre = selectGenre.value;
  const movies = await getMovies(page, title, year, genre);
  renderMovies(movies);
  /* if (title === "") {
    alert("제목을 입력해주세요.");
  } else {
    const movies = await getMovies(page, title, year, genre);
    renderMovies(movies);
  } */
//}); */

// 영화 정보 가져오기
async function getMovies(page = "", title = "frozen", year = "", genre = "") {
  const url = `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}&type=${genre}`;
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
      // 대체 이미지 출력
      if (movie.Poster === "N/A") {
        imgEl.src = "./images/no-image.jpeg";
      }
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

  //초기화
  //movieDetailEl.innerHTML = "";
  page = 1;
  displayBox.classList.add("hidden");
  //스타일을 바꾸면 10개가 있는 걸 안 보이게, 이삭님은 10개의 자리를 빈자리로
  initMovies();
  // moviesEl.style.display = "none";

  // moreBtnEl.style.display = "none";
  moreBtnEl.classList.add("hidden");
  loadingEl.classList.remove("hidden");

  if (!inputID) {
    id = location.hash.slice(1); //#빼고 뒤에 있는 숫자 가져와라
  } else {
    id = inputID;
  }
  movieInfo = await getMovieDetail(id);

  loadingEl.classList.add("hidden");

  //이미지 화질 전환
  const imgLarger = movieInfo.Poster.replace("SX300", "SX700");
  console.log(imgLarger);

  //대체 이미지 출력
  if (movieInfo.Poster === "N/A") {
    const imgEl = document.querySelector(".img-box img");
    imgEl.src = "./images/no-image.jpeg";
  }

  const mvCon = document.createElement("div");
  mvCon.classList.add("movie-container");

  let rateLists = "";

  for (let i = 0; i < movieInfo.Ratings.length; i++) {
    rateLists += `<div class="rating"><img class="rating-img" src="./images/${movieInfo.Ratings[i].Source}.png"> ${movieInfo.Ratings[i].Value} </div>`;
  }

  mvCon.innerHTML = /*html*/ `
  <div class="img-box">
    <img src="${imgLarger}" />
  </div>
  <div class="movie-content">
    <h1 class="title">${movieInfo.Title}</h1>
    <div class="sum">
      <span>${movieInfo.DVD}</span>
      <span>${movieInfo.Runtime}</span>
      <span>${movieInfo.Country}</span>
    </div>
    <p class="plot">${movieInfo.Plot}</p>
    <div class="ratings">
     <h3>Ratings</h3>
     <div class="rating-list">${rateLists}</div>
    </div>
    <div class="actors">
     <h3>Actors</h3>
     <p>${movieInfo.Actors}</p>
    </div>
    <div class="director">
     <h3>Director</h3>
     <p>${movieInfo.Writer}</p>
    </div>
    <div class="production">
     <h3>Production</h3>
     <p>${movieInfo.Production}</p>
    </div>
    <div class="genre">
     <h3>Genre</h3>
     <p>${movieInfo.Genre}</p>
    </div>
  </div>`;
  movieDetailEl.append(mvCon);
}

// 해쉬 체인지
window.addEventListener("hashchange", async function () {
  //renderMovieDetail();
  let hashValue = location.hash.replace("#", "");
  //해쉬가 바뀌면 기본적으로 모든 것을 초기화
  initMovies();
  initDetails();
  infiniteScroll = false;
  if (hashValue === "") {
    displayBox.classList.remove("hidden");
  } else if (hashValue === "search") {
    console.log("hashValue === 'search'");
  } else if (hashValue === "movie") {
    console.log("hashValue === 'movie'");
    displayBox.classList.add("hidden");
    if (inputID) {
      inputID = inputID.replaceAll("#", "");
      renderMovieDetail(inputID);
    }
  } else {
    renderMovieDetail();
  }
});

//초기화 함수
function initMovies() {
  moviesEl.innerHTML = "";
  moreBtnEl.style.display = "none";
}

function initDetails() {
  movieDetailEl.innerHTML = "";
}
