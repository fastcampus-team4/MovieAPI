const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
let title;

(async () => {
  // 초기화 코드
  const moviesEl = document.querySelector('.movies');
  const moreBtnEl = document.querySelector('.btn');
  let page = 1;

  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);

  function renderMovies(movies) {
    for (const movie of movies) {
      const el = document.createElement('div');
      el.classList.add('movie');

      const h1El = document.createElement('h1');
      h1El.textContent = movie.Title;
      h1El.addEventListener('click', () => {
        console.log(movie.Title);
      });
      const imgEl = document.createElement('img');
      imgEl.src = movie.Poster;
      el.append(imgEl, h1El);

      moviesEl.append(el);
    }
  }

  async function getMovies(title = 'avengers', page = 1) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}`);
    const { Search: movies } = await res.json();
    return movies;
  }

  // 더보기 버튼 클릭시, 영화 리스트 10개씩 나옴
  moreBtnEl.addEventListener('click', async () => {
    const movies = await getMovies(title, page);
    page += 1;
    renderMovies(movies);
  });

  // 검색 버튼 클릭시, input 값에 대한 영화 리스트 나옴
  searchBtn.addEventListener('click', async (event) => {
    // 새로고침 방지
    event.preventDefault();
    title = searchInput.value;

    // search-input 값 초기화
    searchInput.value = '';

    initMovies();
    const movies = await getMovies(title, page);
    if (title) {
      renderMovies(movies);
      page += 1;
    } else {
      alert('error');
    }
  });

  function initMovies() {
    // movies 초기화
    moviesEl.innerHTML = '';
    // page 초기화
    page = 1;
  }
})();
