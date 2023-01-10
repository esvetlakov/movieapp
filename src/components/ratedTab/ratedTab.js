import { Pagination, Spin } from 'antd';
import { Component } from 'react';

import CreateCard from '../createCard/createCard';
import './ratedTab.css';

export default class RatedTab extends Component {
  state = {
    currentPage: 1,
  };

  // eslint-disable-next-line
  paginationOnChange = (page) => {
    console.log(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    const { loading, rated, changeUserRating } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="ratedTab">
        <Spin spinning={loading}>
          <CreateCard filmsData={rated} changeUserRating={changeUserRating} />
        </Spin>
        <Pagination
          defaultCurrent={1}
          total={rated.length}
          current={currentPage}
          defaultPageSize={20}
          showSizeChanger={false}
          showQuickJumper
          className={rated.length > 0 ? 'ratedPagination' : 'hidden'}
          onChange={this.paginationOnChange}
        />
      </div>
    );
  }
}
