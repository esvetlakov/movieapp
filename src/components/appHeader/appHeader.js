import { Tabs } from 'antd';
import './appHeader.css';

export default function AppHeader(props) {
  const { changeTab } = props;

  const onChange = (key) => {
    changeTab(key);
  };

  return (
    <header className="header">
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: 'Search',
            key: 'search',
          },
          {
            label: 'Rated',
            key: 'rated',
          },
        ]}
        size="large"
      />
    </header>
  );
}
