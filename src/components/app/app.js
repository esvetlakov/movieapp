import { Component } from 'react';
import { format, parseISO } from 'date-fns';

import SearchTab from '../searchTab/searchTab';
import RatedTab from '../ratedTab/ratedTab';
import AppHeader from '../appHeader/appHeader';
import MovieAPI from '../../api/movieAPI';
import Alerts from '../alerts/alerts';

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
    rated: [],
    ratedTotalPages: 1,
    searchTotalPages: 1,
    loading: false,
    isLoaded: false,
    alert: null,
    currentTab: 'search',
  };

  componentDidMount() {
    this.api.loadGuestID();
  }

  onError = (err) => {
    this.setState({ alert: { status: 'err', msg: err.message }, loading: false });
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

  searchFilms = (name, page) => {
    if (name.trim() === '') {
      this.setState({ alert: { status: 'err', msg: 'Empty request' } });
    } else {
      this.setState({ loading: true, alert: null });
      this.api
        .getMovies(name, page)
        .then((res) => {
          const { data, totalPages } = res;
          if (data.length === 0) {
            this.setState({ filmsData: [], alert: { status: 'not found' }, loading: false });
          } else {
            const newState = data.map((el) => ({
              id: el.id,
              filmName: el.title,
              releaseDate: App.getFilmDate(el.release_date),
              genres: this.getGenresName(el.genre_ids),
              poster: el.poster_path,
              description: el.overview,
              rating: el.vote_average,
              userRating: null,
            }));
            this.setState({
              filmsData: newState,
              loading: false,
              isLoaded: true,
              alert: null,
              searchTotalPages: totalPages,
            });
          }
        })
        .catch((err) => this.onError(err));
    }
  };

  loadRatedFilms = (page) => {
    this.setState({ loading: true, alert: null });
    this.api.getRatedFilms(page).then((res) => {
      const { films, ratedPages } = res;
      const ratedFilms = films.map((el) => ({
        id: el.id,
        filmName: el.title,
        releaseDate: App.getFilmDate(el.release_date),
        genres: this.getGenresName(el.genre_ids),
        poster: el.poster_path,
        description: el.overview,
        rating: el.vote_average.toFixed(1),
        userRating: el.rating,
      }));
      this.setState({
        rated: ratedFilms,
        loading: false,
        isLoaded: true,
        alert: null,
        ratedTotalPages: ratedPages,
      });
    });
  };

  changeTab = (tab) => {
    this.setState({ currentTab: tab });
  };

  changeUserRating = (filmId, rating) => {
    this.setState({ alert: null });
    this.api.changeRating(filmId, rating).then((res) => {
      if (res) {
        this.setState({ alert: { status: 'success' } });
      }
    });
  };

  render() {
    const { filmsData, loading, isLoaded, alert, searchTotalPages, currentTab, rated, ratedTotalPages } = this.state;
    const selectedTab =
      currentTab === 'search' ? (
        <SearchTab
          totalPages={searchTotalPages}
          filmsData={filmsData}
          loading={loading}
          isLoaded={isLoaded}
          changeUserRating={this.changeUserRating}
          searchFilms={this.searchFilms}
        />
      ) : (
        <RatedTab
          ratedTotalPages={ratedTotalPages}
          rated={rated}
          loading={loading}
          isLoaded={isLoaded}
          loadRatedFilms={this.loadRatedFilms}
          changeUserRating={this.changeUserRating}
        />
      );

    return (
      <section className="main">
        <Alerts alert={alert} changeRating />
        <AppHeader changeTab={this.changeTab} />
        {selectedTab}
      </section>
    );
  }
}
