// 초기화 코드
const ContainerEl = document.querySelector('.movie-container');
const posterEl = document.querySelector('.poster');

const movieInfoEl = document.querySelector('.movie-info');
const h1El = document.querySelector('h1');
const releasedEl = document.querySelector('.released');
const runtimeEl = document.querySelector('.runtime');
const countryEl = document.querySelector('.country');
const ratingsEl = document.querySelector('.ratings');
const plotEl = document.querySelector('.plot');
const directorEl = document.querySelector('.director');
const actorsEl = document.querySelector('.actors');
const typeEl = document.querySelector('.type');

let page = 1;

// 해당 id값에 해당되는 영화 하나만을 가져옴
export async function getMovieInfo(id = 'tt1285016') {
  // id로 url 입력해서, 가져와라 정보를
  // const id = 'tt1285016';
  console.log('getMovieInfo 함수 실행!!!');
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}`);
  const movieInfo = await res.json();
  return movieInfo;
}

// movie 상세페이지 렌더링
// export async function renderMovieInfo(movieInfo) {
//   let ratings = '';
//   console.log('renderMovieInfo 실행');
//   const { Poster, Title, Released, Runtime, Country, Ratings, Plot, Director, Actors, Genre } = movieInfo;
//   console.log(movieInfo);
//   console.log(Poster);
//   posterEl.style.backgroundImage = `url(${Poster})`;
//   h1El.textContent = Title;
//   releasedEl.textContent = Released;
//   runtimeEl.textContent = Runtime;
//   countryEl.textContent = Country;

//   // Ratings(평점) 출력
//   for (let i = 0; i < 3; i++) {
//     ratings += `${Ratings[i].Source} : ${Ratings[i].Value} `;
//   }
//   ratingsEl.textContent = ratings;

//   plotEl.textContent = Plot;
//   directorEl.textContent = Director;
//   actorsEl.textContent = Actors;
//   typeEl.textContent = Genre;
// }

// (async () => {
//   // 최초 호출!
//   const movies = await getMovieInfo();
//   page += 1;
//   renderMovieInfo(movies);
// })();
