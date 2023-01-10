import { Component } from 'react';
import { format, parseISO } from 'date-fns';

import SearchTab from '../searchTab/searchTab';
import RatedTab from '../ratedTab/ratedTab';
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
    rated: [],
    totalPages: 1,
    loading: false,
    isLoaded: false,
    error: false,
    notFound: false,
    currentTab: 'search',
  };

  componentDidMount() {
    this.api.loadGuestID();
    if (this.api.myStorage.getItem('ratedFilms')) {
      this.loadSavedFilms(JSON.parse(this.api.myStorage.getItem('ratedFilms')));
    }
  }

  onFilmsLoaded(films, pages) {
    this.setState({
      filmsData: films,
      loading: false,
      isLoaded: true,
      error: false,
      notFound: false,
      totalPages: pages,
    });
  }

  onError = (error) => {
    this.setState({ error: true });
    // eslint-disable-next-line
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

  getRatingFromSaved = (id) => {
    const { rated } = this.state;

    const resID = rated.map((el) => el.id).findIndex((el) => el === id);
    if (resID !== -1) {
      return rated[resID].userRating;
    }
    return null;
  };

  static getFilmDate(date) {
    if (!date) {
      return 'Release date unknown';
    }
    return format(parseISO(date), 'MMMM d, R');
  }

  searchFilms = (name, page) => {
    this.setState({ loading: true, error: false, notFound: false });
    this.api
      .getMovies(name, page)
      .then((res) => {
        const { data, totalPages } = res;
        if (data.length === 0) {
          this.setState({ filmsData: [], loading: false, notFound: true });
        } else {
          const newState = data.map((el) => ({
            id: el.id,
            filmName: el.title,
            releaseDate: App.getFilmDate(el.release_date),
            genres: this.getGenresName(el.genre_ids),
            poster: el.poster_path,
            description: el.overview,
            rating: el.vote_average,
            userRating: this.getRatingFromSaved(el.id),
          }));
          this.onFilmsLoaded(newState, totalPages);
        }
      })
      .catch(this.onError);
  };

  loadSavedFilms = (films) => {
    const newState = [];
    films.forEach((el) => {
      this.api.getFilmByID(el.id).then((res) => {
        const item = {
          id: el.id,
          filmName: res.title,
          releaseDate: App.getFilmDate(res.release_date),
          genres: res.genres.map((elem) => elem.name),
          poster: res.poster_path,
          description: res.overview,
          rating: res.vote_average.toFixed(1),
          userRating: el.rating,
        };
        newState.push(item);
      });
    });
    this.setState({ rated: newState });
  };

  changeTab = (tab) => {
    this.setState({ currentTab: tab });
  };

  addToRated = (filmId, rating) => {
    const { rated } = this.state;
    const newRated = [...rated];
    const idx = rated.findIndex((el) => el.id === filmId);

    this.api.getFilmByID(filmId).then((result) => {
      const item = {
        id: filmId,
        filmName: result.title,
        releaseDate: App.getFilmDate(result.release_date),
        genres: result.genres.map((elem) => elem.name),
        poster: result.poster_path,
        description: result.overview,
        rating: result.vote_average.toFixed(1),
        userRating: rating,
      };
      if (idx === -1) {
        newRated.push(item);
      } else {
        newRated[idx] = item;
      }
      this.setState({ rated: newRated });
    });
  };

  changeUserRating = (filmId, rating) => {
    const { currentTab } = this.state;
    this.api
      .changeRating(filmId, rating)
      .then((res) => {
        if (res) {
          const { rated, filmsData } = this.state;
          if (currentTab === 'search') {
            this.setState(() => {
              const idx = filmsData.findIndex((el) => el.id === filmId);
              const newData = [...filmsData];
              newData[idx].userRating = rating;
              this.api.saveUserRating(filmId, rating);
              return {
                filmsData: newData,
              };
            });
            this.addToRated(filmId, rating);
          } else {
            const filmsDataArr = [...filmsData];
            this.setState(() => {
              const ratedIdx = rated.findIndex((el) => el.id === filmId);
              const check = filmsDataArr.map((item) => item.id).includes(filmId);
              if (check) {
                const idx = filmsDataArr.map((el) => el.id).findIndex((el) => el === filmId);
                filmsDataArr[idx].userRating = rating;
              }
              const newData = [...rated];
              newData[ratedIdx].userRating = rating;
              this.api.saveUserRating(filmId, rating);
              return {
                filmsData: filmsDataArr,
                rated: newData,
              };
            });
          }
        }
      })
      .catch(() => this.onError);
  };

  render() {
    const { filmsData, loading, isLoaded, error, notFound, totalPages, currentTab, rated } = this.state;
    const selectedTab =
      currentTab === 'search' ? (
        <SearchTab
          totalPages={totalPages}
          filmsData={filmsData}
          loading={loading}
          isLoaded={isLoaded}
          changeUserRating={this.changeUserRating}
          searchFilms={this.searchFilms}
        />
      ) : (
        <RatedTab rated={rated} loading={loading} isLoaded={isLoaded} changeUserRating={this.changeUserRating} />
      );

    return (
      <section className="main">
        <ErrorMessages error={error} notFound={notFound} changeRating />
        <AppHeader changeTab={this.changeTab} />
        {selectedTab}
      </section>
    );
  }
}
