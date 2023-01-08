import { Input, Pagination, Spin } from 'antd';
import { Component } from 'react';

import CreateCard from '../createCard/createCard';
import './searchTab.css';

export default class SearchTab extends Component {
  state = {
    searchValue: '',
  };

  paginationOnChange = (page) => {
    const { updateFilms } = this.props;
    updateFilms(page);
  };

  inputOnPressEnter = () => {
    const { searchFilms } = this.props;
    const { searchValue } = this.state;

    searchFilms(searchValue);
    this.setState({ searchValue: '' });
  };

  inputOnChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { currentPage, loading, isLoaded } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="searchTab">
        <Input
          placeholder="Type to search"
          className="input"
          value={searchValue}
          onPressEnter={this.inputOnPressEnter}
          onChange={this.inputOnChange}
        />
        <Spin spinning={loading}>
          <CreateCard currentPage={currentPage} />
        </Spin>
        <Pagination
          defaultCurrent={1}
          total={20}
          pageSize="4"
          className={!isLoaded ? 'hidden' : 'pagination'}
          onChange={this.paginationOnChange}
        />
      </div>
    );
  }
}
