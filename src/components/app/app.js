import { Component } from 'react';
import { format, parseISO } from 'date-fns';

import SearchTab from '../searchTab/searchTab';
import AppHeader from '../appHeader/appHeader';
import MovieAPI from '../../api/movieAPI';
import ErrorMessages from '../errorMessages/errorMessages';

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
    loading: false,
    isLoaded: false,
    error: false,
    notFound: false,
  };

  componentDidMount() {
    this.searchFilms('marvel');
  }

  onFilmsLoaded(films) {
    this.setState({
      filmsData: films,
      currentPage: films.slice(0, 4),
      loading: false,
      isLoaded: true,
      error: false,
      notFound: false,
    });
  }

  onError = (error) => {
    this.setState({ error: true });
    console.log(error);
  };

  getGenresName(ids) {
    const names = [];
    ids.forEach((el) => {
      if (this.genresList.has(el)) {
        names.push(this.genresList.get(el));
      }
    });
    return names;
  }

  static getFilmDate(date) {
    if (!date) {
      return 'Release date unknown';
    }
    return format(parseISO(date), 'MMMM d, R');
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

  searchFilms = (name) => {
    this.setState({ loading: true });
    this.api
      .getMovies(name)
      .then((res) => {
        if (res.length === 0) {
          this.setState({ filmsData: [], currentPage: [], loading: false, notFound: true });
        } else {
          const newState = res.map((el) => ({
            id: el.id,
            filmName: el.title,
            releaseDate: App.getFilmDate(el.release_date),
            genres: this.getGenresName(el.genre_ids),
            poster: el.poster_path,
            description: el.overview,
            rating: el.vote_average,
            userRating: null,
          }));
          this.onFilmsLoaded(newState);
        }
      })
      .catch(this.onError);
  };

  render() {
    const { currentPage, loading, isLoaded, error, notFound } = this.state;
    return (
      <section className="main">
        <ErrorMessages error={error} notFound={notFound} />
        <AppHeader />
        <SearchTab
          currentPage={currentPage}
          loading={loading}
          isLoaded={isLoaded}
          searchFilms={this.searchFilms}
          updateFilms={this.updateFilms}
        />
      </section>
    );
  }
}
