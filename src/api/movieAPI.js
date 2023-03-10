import { Alert } from 'antd';

export default class movieAPI {
  apiBase = 'https://api.themoviedb.org/3/';

  key = '08f8f1812305145853632c3ae154427c';

  guest = '';

  myStorage = window.localStorage;

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      return <Alert message={`recieved error ${res.status}`} type="error" className="error" />;
    }
    return res.json();
  }

  async getMovies(name, page = 1, lang = 'en-US') {
    const query = encodeURI(name);
    const res = await this.getResource(
      `search/movie?api_key=${this.key}&language=${lang}&query=${query}&page=${page}&include_adult=false`
    );
    const result = {
      data: res.results,
      totalPages: res.total_pages,
    };
    return result;
  }

  async generateGuestSession() {
    const guestSession = {};
    this.myStorage.clear();
    await this.getResource(`authentication/guest_session/new?api_key=${this.key}`)
      .then((res) => {
        guestSession.id = res.guest_session_id;
        guestSession.expires = Date.parse(res.expires_at);
        this.myStorage.setItem('guestSession', JSON.stringify(guestSession));
        this.guest = res.guest_session_id;
      })
      // eslint-disable-next-line
      .catch((err) => console.log(err));
  }

  async loadGuestID() {
    let guestSession;
    if (this.myStorage.getItem('guestSession') === null) {
      await this.generateGuestSession();
    } else {
      guestSession = JSON.parse(this.myStorage.getItem('guestSession'));
      if (guestSession.expires < Date.now()) {
        await this.generateGuestSession();
      }
      this.guest = guestSession.id;
    }
  }

  async changeRating(id, rating) {
    const body = {
      value: rating,
    };

    const res = await fetch(`${this.apiBase}movie/${id}/rating?api_key=${this.key}&guest_session_id=${this.guest}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    return res.ok;
  }

  async getRatedFilms(page = 1) {
    const res = await this.getResource(`/guest_session/${this.guest}/rated/movies?api_key=${this.key}&page=${page}`);
    const result = {
      films: res.results,
      ratedPages: res.total_pages,
    };
    return result;
  }

  async getFilmByID(id) {
    const res = await this.getResource(`movie/${id}?api_key=${this.key}&language=en-US`);
    return res;
  }

  async getGenres() {
    const res = await this.getResource(`genre/movie/list?api_key=${this.key}&language=en-US`);
    return res.genres;
  }
}
