export default function fetchData() {
  fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=08f8f1812305145853632c3ae154427c&language=en-US&query=Your%20Name&page=1&include_adult=false'
  ).then((res) => console.log(res));
}
