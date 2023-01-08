import { Alert } from 'antd';

export default class movieAPI {
  apiBase = 'https://api.themoviedb.org/3/';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      return <Alert message={`recieved error ${res.status}`} type="error" className="error" />;
    }
    return res.json();
  }

  async getMovies(name) {
    const query = encodeURI(name);
    const res = await this.getResource(
      `search/movie?api_key=08f8f1812305145853632c3ae154427c&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const result = res.results;

    return result;
  }

  getMovieData(id) {
    return this.getResource(`search/movie/${id}`);
  }

  async getGenres() {
    const res = await this.getResource('genre/movie/list?api_key=08f8f1812305145853632c3ae154427c&language=en-US');
    return res.genres;
  }
}
