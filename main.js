(async () => {
  // 초기화 코드들~
  const moviesEl = document.querySelector(".movies");
  const moreBtnEl = document.querySelector(".btn");
  const inputEl = document.querySelector(".search-form");
  const srchBtn = document.querySelector(".search-btn");
  const countOp = document.querySelector(".count-form");
  const yearOp = document.querySelector(".year-form");

  let page = 1;
  let srchTxt = "frozen";

  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);

  // 검색 입력 받아오기
  srchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    srchTxt = inputEl.value;
    inputEl.value = "";
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
  });
  // 영화 목록 양 선택
  /* countOp.forEach((el) => {
    if ()
  }); */
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

  // api
  async function getMovies(search = "frozen", year = "", page = 1) {
    const url = `https://omdbapi.com/?apikey=7035c60c&s=${search}&y=${year}&page=${page}`;
    // console.log(url);
    const res = await fetch(url);
    const { Search: movies, totalResults } = await res.json();
    return movies;
  }

  // 영화 목록 가져오는 function
  function renderMovies(movies) {
    if (!movies) {
      console.log("movies 가 제대로 안들어왔습니다.");
      return;
    }

    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");
      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      // year
      const yearEl = document.createElement("p");
      yearEl.textContent = movie.Year;
      el.append(h1El, imgEl, yearEl);

      moviesEl.append(el);

      // 엑박 대체 사진은 넣었지만 엑박 표시 없애는 건 해결 못함
      if (movie.Poster === "N/A") {
        imgEl.classList.add("none");
      }
    }
  }
})();
