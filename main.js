// 초기화 코드들~
const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.btn');
const searchBtn = document.querySelector('button#searching');
const movieList = document.querySelector('.movies');

let page = 1;
let title = '';
let year = '';

(async () => {
  // 최초 호출!
  const movies = await getMovies();
  renderMovies(movies);

  // 더보기 버튼 클릭!
  moreBtnEl.addEventListener('click', async () => {
    page += 1;
    const movies = await getMovies(title, page, year);
    renderMovies(movies);
  });

  // 검색 버튼 클릭
  searchBtn.addEventListener('click', async function () {
    movieList.innerHTML = '';
    title = document.querySelector('input#searching').value;
    console.log(title);
    console.log(page);
    if (title === '') {
      alert('제목을 입력해 주세요.');
    } else {
      for (i = 1; i <= page; i++) {
        const movies = await getMovies(title, i, year);
        renderMovies(movies);
      }
    }
  });
})();

async function getMovies(title = 'avengers', page = 1, year = '') {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`
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
// 목록갯수 선택(어느페이지까지 불러올지)
function selectedPage(paging) {
  page = paging.value;
  console.log(page);
}

// 개봉연도 선택
function selectedYear(selectYear) {
  year = selectYear.value;
  console.log(year);
}
// 개봉연도 선택지 만들기
for (i = 2022; i > 1984; i--) {
  const selectYear = document.querySelector('.year');
  const yearOpt = document.createElement('option');
  yearOpt.value = i;
  yearOpt.textContent = i;
  selectYear.append(yearOpt);
}
