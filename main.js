/* import { renderInfo } from "./renderInfo";
import { renderMovies } from "./renderMovies"; */

(async () => {
  // 초기화 코드들~
  const moviesEl = document.querySelector(".movies");

  const moreBtnWrap = document.querySelector(".actions");
  const moreBtnEl = document.querySelector(".btn");

  const formEl = document.querySelector(".forms");
  const inputEl = document.querySelector(".search-form");
  const srchBtn = document.querySelector(".search-btn");
  const countOp = document.querySelector(".count-form");
  const yearOp = document.querySelector(".year-form");
  const infoWrap = document.querySelector(".info-list");

  const body = document.querySelector("body");

  let page = 1;
  let srchTxt = "frozen";
  let inputID = "#tt4154756";

  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);

  // 검색 입력 받아오기
  srchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // renderSearch();
    srchTxt = inputEl.value;
    // inputEl.value = "";
    moviesEl.innerHTML = "";
    page = 1;
    const year = yearOp.value;
    countVal = countOp.value;

    if (srchTxt) {
      const movies = await getMovies(srchTxt, year, page);
      renderMovies(movies);
      for (let i = 1; i < countVal; i++) {
        pageCntUp();
      }
    }
    if (srchTxt === "") {
      moreBtnEl.remove();
    }
  });
  // 영화 목록 양 선택 -> 아래 방식으로 하면 페이지에 +1 되어 20개가 나오는 것이 아니고 2페이지에 해당하는 10개가 나옴, 페이지에 +1 해주는 함수 따로 만들어줘야 함
  /* for (let i = 1; i <= countOp.length; i++) {
    if (countOp.value === i) {
      srchTxt = inputEl.value;
      let year = yearOp.value;
      // page += 1
      const movies = await getMovies(srchTxt, year, countOp.value);
      renderMovies(movies);
    }
  } */

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener("click", async () => {
    pageCntUp();
  });

  // 개봉연도 검색
  for (let i = 2022; i >= 1985; i--) {
    const yearOptions = document.createElement("option");
    yearOptions.value = i;
    yearOptions.textContent = i;
    yearOp.append(yearOptions);
  }
  const yearOptions = document.querySelectorAll(".year-form option");
  let year = "";
  let opsVal = yearOptions.value;
  if (opsVal === year) {
    const movies = await getMovies(srchTxt, opsVal, page);
    renderMovies(movies);
  }

  // 페이지 더 가져오는 function
  async function pageCntUp() {
    page += 1;
    const year = yearOp.value;
    const movies = await getMovies(srchTxt, year, page); // 왜 인수를 넣으면 에러가 나지?
    renderMovies(movies);
  }

  // 상세정보

  window.addEventListener("hashchange", () => {
    const hashValue = location.hash.slice(1);
    console.log("해쉬값 ", hashValue);
    if (hashValue === "") {
      renderSearch();
    } else if (hashValue === "search") {
      renderSearch();
    } else if (hashValue === "movie") {
      console.log("movie 로 이동!");
      initMovies();
      initInfo();
      if (inputID) {
        renderMovieInfo(inputID);
      }
      console.log("inputID: ", inputID);
    } else if (hashValue === "about") {
      console.log("about 입니다.");
      renderAbout();
    } else {
      // ID 해쉬를 받은 경우
      console.log("id해쉬로 디테일 랜더링");
      inputID = location.hash.slice(1);
      renderMovieInfo(inputID);
    }
  });

  // 무한 스크롤
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("무한 스크롤 작동!!!");
        pageCntUp();
      }
    });
  });
  io.observe(moreBtnEl);

  // api
  async function getMovies(search = "frozen", year = "", page = 1) {
    const url = `https://omdbapi.com/?apikey=7035c60c&s=${search}&y=${year}&page=${page}`;
    // console.log(url);
    const res = await fetch(url);
    const { Search: movies, totalResults } = await res.json();
    // console.log(movies);
    return movies;
  }
  async function getMovieInfo(id = "") {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    );
    const json = await res.json();
    if (json.Response === "True") {
      return json;
    }
    return json.Error;
  }

  // 검색페이지 랜더링 함수
  async function renderSearch() {
    console.log("renderSearch");
    initMovies();
    initInfo();
    const movies = await getMovies();
    renderMovies(movies);
  }
  function renderAbout() {
    console.log("renderAbout");
  }
  // 랜더링 초기화 함수
  function initMovies() {
    moviesEl.innerHTML = "";
    moviesEl.classList.add("movies--none");
    page = 1;
    moreBtnWrap.classList.add("btn--none");
  }
  function initInfo() {
    infoWrap.innerHTML = "";
  }
  // 영화 목록 가져오는 function
  function renderMovies(movies) {
    if (!movies) {
      console.log("movies 가 들어오지 않았습니다.");
      return;
    }

    moviesEl.classList.remove("movies--none");

    for (const movie of movies) {
      // console.log(movie.Poster);

      const el = document.createElement("div");
      el.classList.add("movie");
      el.dataset.id = `${movie.imdbID}`;

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      const aEl = document.createElement("a");
      aEl.href = `/#${movie.imdbID}`;
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;

      // year
      const yearEl = document.createElement("p");
      yearEl.textContent = movie.Year;

      aEl.append(imgEl);
      el.append(h1El, aEl, yearEl);

      moviesEl.append(el);

      if (movie.Poster === "N/A") {
        imgEl.src = "img/product_empty.png";
      }
    }
    moreBtnWrap.classList.remove("btn--none");
  }

  // 상세 정보 가져오는 function
  async function renderMovieInfo(inputID) {
    let id;
    let movieInfo;

    initMovies();
    console.log(inputID);

    if (!inputID) {
      id = location.hash.slice(1);
      console.log(id);
      return;
    } else {
      id = inputID;
    }
    movieInfo = await getMovieInfo(id);

    // 여기 아래는 좀 다르게 함
    // 화면에 출력할 요소들
    const infoEl = document.createElement("div");
    infoEl.classList.add("info");

    const h1El = document.createElement("h1");
    h1El.textContent = movieInfo.Title;

    const imgEl = document.createElement("img");
    imgEl.src = movieInfo.Poster;
    imgEl.src = imgEl.src.replace("SX300", "SX700");

    const pElPlot = document.createElement("p");
    pElPlot.textContent = `줄거리 : ${movieInfo.Plot}`;

    const pElYear = document.createElement("p");
    pElYear.textContent = `개봉연도 : ${movieInfo.Year}`;

    const pElRated = document.createElement("p");
    pElRated.textContent = `등급 : ${movieInfo.Rated}`;

    const pElReleased = document.createElement("p");
    pElReleased.textContent = `개봉일 : ${movieInfo.Released}`;

    const pElRuntime = document.createElement("p");
    pElRuntime.textContent = `상영시간 : ${movieInfo.Runtime}`;

    const pElGenre = document.createElement("p");
    pElGenre.textContent = `장르 : ${movieInfo.Genre}`;

    const pElDirector = document.createElement("p");
    pElDirector.textContent = `감독 : ${movieInfo.Director}`;

    const pElWriter = document.createElement("p");
    pElWriter.textContent = `작가 : ${movieInfo.Writer}`;

    const pElActors = document.createElement("p");
    pElActors.textContent = `출연진 : ${movieInfo.Actors}`;

    const pElCountry = document.createElement("p");
    pElCountry.textContent = `제작 국가 : ${movieInfo.Country}`;

    const pElRatings = document.createElement("p");
    let ratingList = "";
    // let i = 0; i < movieInfo.Ratings.length; i++
    // console.log(Value);
    for (let i = 0; i < movieInfo.Ratings.length; i++) {
      ratingList += `${movieInfo.Ratings[i].Source} : ${movieInfo.Ratings[i].Value} <br>`;
    }
    pElRatings.innerHTML = /* html */ `평점 : <br> ${ratingList}`;
    if (movieInfo.Ratings.length === 0) {
      pElRatings.innerHTML = "";
    }

    infoEl.append(
      h1El,
      imgEl,
      pElPlot,
      pElYear,
      pElRated,
      pElReleased,
      pElRuntime,
      pElGenre,
      pElDirector,
      pElWriter,
      pElActors,
      pElCountry,
      pElRatings
    );
    // 이 함수 안에서 만든 modal 이라는 div 태그에다가 위에서 만든 요소들 밀어넣어주기

    infoWrap.append(infoEl); // 비어 있는 바디에 다시 modal 밀어넣어주기

    if (movieInfo.Poster === "N/A") {
      imgEl.src = "img/product_empty.png";
    }
  }
})();

// 만든거 이름이랑 요소 수정하고 상세페이지로 이동한 곳에서 돌아가기 버튼 만들기
// 하지만 뒤로 가기는 아직 ㅠㅠ
