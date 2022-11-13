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
const moviesLoading = document.querySelector(".movies-loading");
const displayBox = document.querySelector(".display-box");
let infiniteScroll = false;

let inputID = "tt2294629";
let page = 1;

(async () => {
  const movies = await getMovies();
  page += 1;
})();

//반복문으로 영화 연도 option 생성
for (let i = 2022; i >= 1985; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  selectYear.append(optionEl);
}

//검색 기능 핸들러
const handleSearchBtn = async (event) => {
  event.preventDefault();
  moviesEl.classList.remove("hidden");
  infiniteScroll = true;
  page = 1;

  moviesEl.innerHTML = "";
  let title = inputSearch.value || "frozen";
  let year = selectYear.value || "";
  let genre = selectGenre.value || "movie";
  moviesLoading.classList.remove("hidden");
  const movies = await getMovies(page, title, year, genre);
  console.log(
    `검색버튼 작동! title:${title} year:${year} genre:${genre} page:${page}`
  );
  moviesLoading.classList.add("hidden");
  moreBtnEl.classList.remove("hidden");
  renderMovies(movies);

  inputSearch.value = "";

  //영화 개수 선택
  if (selectNumber.value === 20) {
    handleMoreBtn();
  }
  if (selectNumber.value === 30) {
    handleMoreBtn();
    handleMoreBtn();
  }
};

searchBtn.addEventListener("click", handleSearchBtn);

//영화 정보 가져오기
async function getMovies(page = "", title = "frozen", year = "", genre = "") {
  const url = `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}&type=${genre}`;
  const res = await fetch(url);
  const { Search: movies } = await res.json();
  return movies;
}

//영화 정보 화면에 출력
function renderMovies(movies) {
  console.log("rendermovies", movies);
  if (!movies) {
    // movies === undefined 거나 null
    console.log("movies가 존재하지 않습니다.");
    return;
  } else {
    for (const movie of movies) {
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
      moreBtnEl.classList.remove("hidden");
    }
  }
}

//단일 영화 상세 정보 가져오기
async function getMovieDetail(id = "tt2294629") {
  loadingEl.classList.remove("hidden");
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`;
  const res = await fetch(url);
  const movieInfo = await res.json();
  loadingEl.classList.add("hidden");
  return movieInfo;
}

//단일 영화 상세 페이지 출력
async function renderMovieDetail(inputID) {
  let id;
  let movieInfo;

  page = 1;
  displayBox.classList.add("hidden");
  moviesEl.classList.add("hidden");
  initMovies();

  if (!inputID) {
    id = location.hash.slice(1);
  } else {
    id = inputID;
  }
  movieInfo = await getMovieDetail(id);

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

//해쉬 체인지
window.addEventListener("hashchange", async function () {
  let hashValue = location.hash.replace("#", "");
  initMovies();
  initDetails();
  infiniteScroll = false;
  if (hashValue === "") {
    displayBox.classList.remove("hidden");
  } else if (hashValue === "search") {
    console.log("hashValue === 'search'");
  } else if (hashValue === "movie") {
    infiniteScroll = false;
    console.log("hashValue === 'movie'");
    if (inputID) {
      inputID = inputID.replaceAll("#", "");
      renderMovieDetail(inputID);
      console.log("작동하고 있나요");
    }
  } else {
    renderMovieDetail();
  }
});

//더보기 버튼 핸들러
const handleMoreBtn = async () => {
  console.log("selectNumber.value : ", selectNumber.value);
  page += 1;
  let title = inputSearch.value || "frozen";
  let year = selectYear.value;
  let genre = selectGenre.value;
  console.log("moreBtn 작동", page, title, year, genre);
  const movies = await getMovies(page, title, year, genre);
  renderMovies(movies);
};

//무한 스크롤
const detectBottom = () => {
  let scrollTop = document.documentElement.scrollTop;
  let innerHeight = window.innerHeight;
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
      console.log("more 작동!");
      handleMoreBtn();
    }
  }, 1000)
);

//더보기 버튼 활성화
moreBtnEl.addEventListener("click", handleMoreBtn);

//초기화 함수
function initMovies() {
  moviesEl.innerHTML = "";
  moreBtnEl.style.display = "none";
}

function initDetails() {
  movieDetailEl.innerHTML = "";
}
