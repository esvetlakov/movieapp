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

  static getFilmDate(date) {
    if (!date) {
      return 'Release date unknown';
    }
    return format(parseISO(date), 'MMMM d, R');
  }

  searchFilms = (name, page) => {
    this.setState({ loading: true });
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
            userRating: null,
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

  changeUserRating = (id, rating) => {
    const { currentTab } = this.state;
    this.api
      .changeRating(id, rating)
      .then((res) => {
        if (res) {
          if (currentTab === 'search') {
            this.setState(({ filmsData }) => {
              const idx = filmsData.findIndex((el) => el.id === id);
              const newData = [...filmsData];
              newData[idx].userRating = rating;
              this.api.saveUserRating(id, rating);
              return {
                filmsData: newData,
              };
            });
          } else {
            this.setState(({ rated }) => {
              const idx = rated.findIndex((el) => el.id === id);
              const newData = [...rated];
              newData[idx].userRating = rating;
              this.api.saveUserRating(id, rating);
              return {
                rated: newData,
              };
            });
          }
        }
      })
      .then(() => {
        this.setState(({ rated }) => {
          this.api.getFilmByID(id).then((res) => {
            const newRated = [...rated];
            const item = {
              id: id,
              filmName: res.title,
              releaseDate: App.getFilmDate(res.release_date),
              genres: res.genres.map((elem) => elem.name),
              poster: res.poster_path,
              description: res.overview,
              rating: res.vote_average.toFixed(1),
              userRating: rating,
            };
            newRated.push(item);
            return {
              rated: newRated,
            };
          });
        });
      });
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
        <RatedTab
          rated={rated}
          loading={loading}
          isLoaded={isLoaded}
          changeUserRating={this.changeUserRating}
          searchFilms={this.searchFilms}
        />
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
