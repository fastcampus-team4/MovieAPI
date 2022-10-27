/* (async () => {
  const moviesEl = document.querySelector(".movies");
  const srchInput = document.querySelector("input");
  const srchBtn = document.querySelector("button");

  srchBtn.addEventListener("click", async (e) => {
    if (srchInput.value !== "") {
      e.preventDefault();
      const movies = await searchMovies(srchInput.value, 3);
      renderMovies(movies);
    }
  });

  async function searchMovies(srch = "", page = 1) {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${srch}&page=${page}`
    );
    const { Search: movies, totalResults } = await res.json();
    return movies;
  }

  function renderMovies(movies) {
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");
      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      h1El.addEventListener("click", () => {
        console.log(movie.Title);
      });
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      el.append(h1El, imgEl);

      moviesEl.append(el);
    }
  }
})(); */

(async () => {
  // 초기화 코드들~
  const moviesEl = document.querySelector(".movies");
  const moreBtnEl = document.querySelector(".btn");
  const inputEl = document.querySelector("input");
  const srchBtn = document.querySelector("button");
  let page = 1;

  // 최초 호출!
  /* const movies = await getMovies();
  page += 1;
  renderMovies(movies); */

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener("click", async () => {
    const movies = await getMovies(inputEl.value, page);
    page += 1;
    renderMovies(movies);
  });

  // 검색 입력 받아오기
  srchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    srchTxt = inputEl.value;
    inputEl.value = "";
    moviesEl.innerHTML = "";
    page = 1;

    if (srchTxt) {
      const movies = await getMovies(srchTxt, page);
      renderMovies(movies);
    }
  });

  async function getMovies(search = "", page = 1) {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${search}&page=${page}`
    );
    const { Search: movies, totalResults } = await res.json();
    return movies;
  }
  function renderMovies(movies) {
    console.log(movies);
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      h1El.addEventListener("click", () => {
        console.log(movie.Title);
      });
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      el.append(h1El, imgEl);

      moviesEl.append(el);
    }
  }
})();
