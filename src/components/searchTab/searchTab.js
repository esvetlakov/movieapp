import { Input, Pagination, Spin } from 'antd';
import { Component } from 'react';

import MovieCard from '../movieCard/movieCard';
import './searchTab.css';

export default class SearchTab extends Component {
  static debounce(fn, debounceTime = 400) {
    let timer;
    // eslint-disable-next-line
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, debounceTime);
    };
  }

  state = {
    searchValue: '',
    currentPage: 1,
  };

  paginationOnChange = (page) => {
    const { searchFilms } = this.props;
    const { searchValue } = this.state;

    this.setState({ currentPage: page });

    searchFilms(searchValue, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  inputOnChange = (e) => {
    const { searchFilms } = this.props;
    const { value } = e.target;

    this.setState({ searchValue: value, currentPage: 1 });

    if (value !== '') {
      searchFilms(value);
    } else {
      this.setState({ searchValue: '' });
    }
  };

  createFilmList() {
    const { filmsData, changeUserRating } = this.props;
    const list = filmsData.map((film) => <MovieCard film={film} changeUserRating={changeUserRating} key={film.id} />);
    return <div className="cards">{list}</div>;
  }

  render() {
    const { loading, isLoaded, totalPages } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="searchTab">
        <Input placeholder="Type to search" className="input" onChange={SearchTab.debounce(this.inputOnChange)} />
        <Spin spinning={loading}>{this.createFilmList()}</Spin>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalPages * 20}
          defaultPageSize={20}
          showSizeChanger={false}
          showQuickJumper
          className={!isLoaded ? 'hidden' : 'pagination'}
          onChange={this.paginationOnChange}
        />
      </div>
    );
  }
}
