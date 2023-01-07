import { Input, Pagination } from 'antd';

import CreateCard from '../createCard/createCard';
import './searchTab.css';

export default function SearchTab(props) {
  const { currentPage, updateFilms } = props;

  const onChange = (page) => {
    updateFilms(page);
  };

  return (
    <div className="searchTab">
      <Input placeholder="Type to search" className="input" />
      <CreateCard currentPage={currentPage} />
      <Pagination defaultCurrent={1} total={20} pageSize="4" className="pagination" onChange={onChange} />
    </div>
  );
}
