import { Tag, Layout, Typography, Rate, Progress, Spin, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './createCard.css';

export default function CreateCard(props) {
  const { Sider } = Layout;
  const { Title, Paragraph, Text } = Typography;
  const { filmsData, changeUserRating } = props;

  const genresTags = (genres, id) => genres.map((genre) => <Tag key={`${id}${genre}`}>{genre}</Tag>);

  const posterURL = (poster) => {
    if (!poster) {
      return '../../static/noImage.jpg';
    }
    return `https://themoviedb.org/t/p/w300_and_h450_bestv2${poster}`;
  };

  const ratingColor = (rating) => {
    if (rating < 3) {
      return '#E90000';
    }
    if (rating < 5) {
      return '#E97E00';
    }
    if (rating < 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const cards = filmsData.map((film) => {
    const { filmName, description, releaseDate, genres, poster, rating, userRating, id } = film;
    const onRatingChange = (val) => {
      changeUserRating(id, val);
    };
    return (
      <Layout className="cardWrapper" key={id}>
        <Sider width="183" className="sider">
          <Image
            width={183}
            height={279}
            src={posterURL(poster)}
            placeholder={<Spin indicator={antIcon} className="spin" />}
          />
        </Sider>
        <Layout className="cardInfo">
          <header className="title">
            <Title level={3} className="filmName">
              {filmName}
            </Title>
            <Progress
              type="circle"
              percent={0}
              format={() => `${rating}`}
              width={40}
              trailColor={ratingColor(rating)}
              className="rating"
            />
          </header>
          <Text className="releaseDate">{releaseDate}</Text>
          <div className="tags">{genresTags(genres, id)}</div>
          <Paragraph
            className="description"
            ellipsis={
              (true,
              {
                rows: 5,
              })
            }
          >
            {description}
          </Paragraph>
          <Rate count={10} allowHalf defaultValue={userRating} className="userRating" onChange={onRatingChange} />
        </Layout>
      </Layout>
    );
  });

  return <div className="cards">{cards}</div>;
}
