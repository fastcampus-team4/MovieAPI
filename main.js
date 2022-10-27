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

  moreBtnEl.addEventListener('click', async () => {
    const movies = await getMovies(title, page);
    page += 1;
    renderMovies(movies);
  });

  searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    page = 1;
    title = searchInput.value;
    const movies = await getMovies(title, page);
    moviesEl.innerHTML = '';
    if (title) {
      renderMovies(movies);
    } else {
      alert('error');
    }
  });

  async function getMovies(title = 'avengers', page = 1) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}`);
    const { Search: movies } = await res.json();
    return movies;
  }

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
})();
