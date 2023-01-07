import { Component } from 'react';

import SearchTab from '../searchTab/searchTab';
import AppHeader from '../appHeader/appHeader';
import AppFooter from '../appFooter/appFooter';
// import fetchData from '../fetchData/fetchData';

export default class App extends Component {
  state = {
    filmsData: [
      {
        filmName: 'Your Name 2',
        releaseDate: 'Sep 13, 2013',
        genres: ['Action', 'Drama', 'Anime'],
        description:
          'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
      },
      {
        filmName: 'Your Name 2',
        releaseDate: 'Sep 13, 2013',
        genres: ['Action', 'Drama', 'Anime'],
        description:
          'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
      },
      {
        filmName: 'Your Name 2',
        releaseDate: 'Sep 13, 2013',
        genres: ['Action', 'Drama', 'Anime'],
        description:
          'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
      },
      {
        filmName: 'Your Name 2',
        releaseDate: 'Sep 13, 2013',
        genres: ['Action', 'Drama', 'Anime'],
        description:
          'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
      },
    ],
  };

  render() {
    const { filmsData } = this.state;
    return (
      <section className="main">
        <AppHeader />
        <SearchTab filmsData={filmsData} />
        <AppFooter />
      </section>
    );
  }
}
