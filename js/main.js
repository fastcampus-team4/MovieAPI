// fetch('https://omdbapi.com/?apikey=7035c60c&s=frozen')
//   .then(res => res.json())
//   .then(res => console.log(res))

// fetch('주소')
//   .then(res => res,json)
//   .then(res => {
//     // res is result!
//   })

// 위와 동일한 코드
// const res = await fetch('주소')
// const json = await res.json()
// // json is result!



// 즉시 실행 함수
;(async () => {
  // 초기화 코드들
  const moviesEl = document.querySelector('.movies')
  const moreBtnEl = document.querySelector('.btn')
  const movieSearch = document.querySelector('#search');
  const movieSearchBtn = document.querySelector('#searchBtn');
  let movieSearchVal;
  let page = 1
  let maxPage = -1;

  // 최초 호출
  const movies = await getMovies()
  page += 1
  renderMovies(movies)

  // 더보기 버튼 클릭
  moreBtnEl.addEventListener('click', async () => {
    searchInput = movieSearchVal;
    const movies = await getMovies(searchInput, page)
    page += 1
    renderMovies(movies)
  })

  movieSearchBtn.addEventListener('click', async () => {
    movieSearchVal = movieSearch.value;
    page = 1;
    const movies = await getMovies(movieSearchVal, page);
  
  
    moviesEl.innerHTML = ' ';

    if(movieSearchVal) {
      renderMovies(movies)
      // moreBtnEl.style.display = "none"
    } else {
      alert('검색을 입력해주세요!')
    }
    

    
  })

  async function getMovies(searchInput = 'frozen', page = 1) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${searchInput}&page=${page}`)
    const {Search: movies, totalResults} = await res.json()
    return movies

    console.log(res)

    if(page >= maxPage) {
      // 버튼 삭제 코드
      return
    }
  }

  function renderMovies(movies) {
    console.log(movies)
    for (const movie of movies) {
      const el = document.createElement('div')
      el.classList.add('movie')

      // Type 1. 확장성에 유리함.
      const h1El = document.createElement('h1')
      h1El.textContent = movie.Title
      h1El.addEventListener('click', () => {
        console.log(movie.Title)
      })
      const imgEl = document.createElement('img')
      imgEl.src = movie.Poster
      el.append(h1El, imgEl)

      moviesEl.append(el)

      // Type 2. 간단한 코드
      // el.innerHTML = /* HTML */`
      //   <h1>${movie.Title}</h1>
      //   <img src= "${movie.Poster}" />
      // `

      // const h1El = el.querySelector('h1')
      // h1El.addEventListener('click', () => {
      //   console.log(movie.Title)
      // })
    }
  }
})()