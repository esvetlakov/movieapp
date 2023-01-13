import { Pagination, Spin } from 'antd';
import { Component } from 'react';

import CreateCard from '../createCard/createCard';
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

  render() {
    const { loading, rated, changeUserRating, ratedTotalPages } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="ratedTab">
        <Spin spinning={loading}>
          <CreateCard filmsData={rated} changeUserRating={changeUserRating} />
        </Spin>
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
