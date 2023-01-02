import { Component } from 'react';

import CreateCard from '../createCard/createCard';
import AppHeader from '../appHeader/appHeader';
import AppFooter from '../appFooter/appFooter';

export default class App extends Component {
  state = {
    filmsData: [
      {
        filmName: 'Your Name',
        releaseDate: 'Sep 13, 2019',
        genres: ['Action', 'Drama'],
        description: '',
      },
      {
        filmName: 'Your Name 2',
        releaseDate: 'Sep 13, 2013',
        genres: ['Action', 'Drama', 'Anime'],
        description: '',
      },
    ],
  };

  render() {
    const { filmsData } = this.state;
    return (
      <section className="main">
        <AppHeader />
        <CreateCard filmsData={filmsData} />
        <AppFooter />
      </section>
    );
  }
}
