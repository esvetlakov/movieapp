import { Component } from 'react';
import { format, parseISO } from 'date-fns';

import SearchTab from '../searchTab/searchTab';
import AppHeader from '../appHeader/appHeader';
import AppFooter from '../appFooter/appFooter';
import MovieAPI from '../../api/movieAPI';

export default class App extends Component {
  api = new MovieAPI();

  genresList = this.api.getGenres().then((res) => {
    this.genresList = new Map();
    res.forEach((el) => {
      this.genresList.set(el.id, el.name);
    });
  });

  state = {
    filmsData: [],
    currentPage: [],
  };

  componentDidMount() {
    this.searchFilms();
  }

  getGenresName(ids) {
    const names = [];
    ids.forEach((el) => {
      if (this.genresList.has(el)) {
        names.push(this.genresList.get(el));
      }
    });
    return names;
  }

  updateFilms = (page) => {
    const { filmsData } = this.state;
    let newState = [];
    if (page === 1) {
      newState = filmsData.slice(0, 4);
    } else if (page === 2) {
      newState = filmsData.slice(4, 8);
    } else if (page === 3) {
      newState = filmsData.slice(8, 12);
    } else if (page === 4) {
      newState = filmsData.slice(12, 16);
    } else if (page === 5) {
      newState = filmsData.slice(16, 20);
    }
    this.setState({ currentPage: newState });
  };

  searchFilms() {
    this.api.getMovies().then((res) => {
      const newState = res.map((el) => {
        const genresNames = this.getGenresName(el.genre_ids);
        let date;
        if (!el.release_date) {
          date = 'Release date unknown';
        } else {
          date = format(parseISO(el.release_date), 'MMMM d, R');
        }
        return {
          id: el.id,
          filmName: el.title,
          releaseDate: date,
          genres: genresNames,
          poster: el.poster_path,
          description: el.overview,
          rating: el.vote_average,
          userRating: null,
        };
      });
      this.setState({ filmsData: newState, currentPage: newState.slice(0, 4) });
    });
  }

  render() {
    const { currentPage } = this.state;
    return (
      <section className="main">
        <AppHeader />
        <SearchTab currentPage={currentPage} updateFilms={this.updateFilms} />
        <AppFooter />
      </section>
    );
  }
}
