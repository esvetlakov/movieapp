import { Pagination, Spin } from 'antd';
import { Component } from 'react';

import MovieCard from '../movieCard/movieCard';
import './ratedTab.css';

export default class RatedTab extends Component {
  state = {
    currentPage: 1,
  };

  componentDidMount() {
    const { loadRatedFilms } = this.props;
    loadRatedFilms();
  }

  paginationOnChange = (page) => {
    const { loadRatedFilms } = this.props;
    loadRatedFilms(page);
    this.setState({ currentPage: page });
  };

  createFilmList() {
    const { changeUserRating, rated } = this.props;
    const list = rated.map((film) => <MovieCard film={film} changeUserRating={changeUserRating} key={film.id} />);
    return <div className="cards">{list}</div>;
  }

  render() {
    const { loading, ratedTotalPages } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="ratedTab">
        <Spin spinning={loading}>{this.createFilmList()}</Spin>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={ratedTotalPages * 20}
          defaultPageSize={20}
          showSizeChanger={false}
          showQuickJumper
          className="ratedPagination"
          onChange={this.paginationOnChange}
        />
      </div>
    );
  }
}
