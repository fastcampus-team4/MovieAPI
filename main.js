// 초기화 코드들~
const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.btn');
const searchBtn = document.querySelector('button#searching');

const movieList = document.querySelector('.movies');
let page = 1;
let title = '';

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener('click', async () => {
    const movies = await getMovies(page, title);
    page += 1;
    renderMovies(movies);
  });

  // 검색 버튼 클릭
  searchBtn.addEventListener('click', async function () {
    movieList.innerHTML = '';
    title = document.querySelector('input#searching').value;
    if (title === '') {
      alert('제목을 입력해 주세요.');
    } else {
      const movies = await getMovies(1, title);
      renderMovies(movies);
    }
  });
})();

async function getMovies(page = 1, title = 'avengers') {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}`
  );
  const { Search: movies, totalResults } = await res.json();
  return movies;
}

function renderMovies(movies) {
  for (const movie of movies) {
    const el = document.createElement('div');
    el.classList.add('movie');
    // <div class="movie"></div>

    // Type 1
    // el.innerHTML = /* html */ `
    //   <h1>${movie.Title}</h1>
    //   <img src="${movie.Poster}" />
    // `
    // const h1El = el.querySelector('h1')
    // h1El.addEventListener('click', () => {
    //   console.log(movie.Title)
    // })

    // Type 2
    const h1El = document.createElement('h1');
    h1El.textContent = movie.Title;
    h1El.addEventListener('click', () => {
      console.log(movie.Title);
    });
    const imgEl = document.createElement('img');
    imgEl.src = movie.Poster;
    el.append(h1El, imgEl);

    moviesEl.append(el);
  }
}
