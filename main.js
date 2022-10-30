// 초기화 코드들~
const moviesEl = document.querySelector('.movies');
const moreBtnEl = document.querySelector('.btn');
const searchBtn = document.querySelector('button#searching');
const movieEl = document.querySelector('.movie');
const movieA = document.querySelector('a');
const bodyEl = document.querySelector('body');

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
    moviesEl.innerHTML = '';
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

// 영화포스터 클릭(상세정보)
window.addEventListener('hashchange', async function () {
  const id = location.hash.substr(9);
  const movie = await getMovie(id);
  renderMovie(movie);
});

// async function getDetail() {
//   const id = location.hash.substr(9);
//   const movie = await getMovie(id);
//   renderMovie(movie);
// }

// async function router() {
//   const routePath = location.hash;

//   if (routePath === '') {
//     //최초호출 화면
//     const movies = await getMovies();
//     renderMovies(movies);
//   } else if (routePath.indexOf('#/detail/') >= 0) {
//   }
// }

// 영화목록 불러오기
async function getMovies(title = 'avengers', page = 1, year = '') {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&y=${year}`
  );
  const { Search: movies, totalResults } = await res.json();
  return movies;
}
// 영화목록 화면 출력하기
function renderMovies(movies) {
  for (const movie of movies) {
    const el = document.createElement('div');
    const movieHash = document.createElement('a');
    movieHash.href = `#/detail/${movie.imdbID}`;
    el.append(movieHash);
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
    movieHash.append(h1El, imgEl);

    moviesEl.append(el);
  }
}

// 영화 상세정보 불러오기
async function getMovie(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  if (json.Response === 'True') {
    console.log(json);
    return json;
  }
  return json.Error;
}

// 상세정보 화면출력
function renderMovie(movie) {
  bodyEl.innerHTML = '';
  const el = document.createElement('div');

  el.innerHTML = /* html */ `
    <img src="${movie.Poster}" />
    <h1>${movie.Title}</h1>
    <p>${movie.Year} ${movie.Runtime} ${movie.Country}</p>
    <p>${movie.Plot}</p>

  `;
  bodyEl.append(el);
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
