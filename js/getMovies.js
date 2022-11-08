// api 호출 함수
// 입력창에 keyword 입력시 해당 keyword에 해당하는 `영화들`을 가져옴
export default async function getMovies(title = 'avengers', type = 'movie', page = 1, year = '') {
  const url = `https://omdbapi.com/?&apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`;
  const res = await fetch(url);
  const { Search: movies, totalResults: total } = await res.json();
  return {
    movies,
    total: Number(total),
  };
}
