import { Input, Pagination } from 'antd';
import CreateCard from '../createCard/createCard';
import fetchData from '../fetchData/fetchData';
import './searchTab.css';

export default function SearchTab(props) {
  const { filmsData } = props;
  // fetchData();
  return (
    <div className="searchTab">
      <div className="filmSearch">
        <Input placeholder="Type to search" />
      </div>
      <CreateCard filmsData={filmsData} />
      <div className="pagination">
        <Pagination defaultCurrent={1} total={20} pageSize="4" />
      </div>
    </div>
  );
}
