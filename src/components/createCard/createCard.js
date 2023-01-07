import { Tag, Layout, Typography, Rate, Progress } from 'antd';
import './createCard.css';

export default function CreateCard(props) {
  const { Sider } = Layout;
  const { Title, Paragraph, Text } = Typography;
  const { currentPage } = props;

  const cards = currentPage.map((film) => {
    const { filmName, description, releaseDate, genres, poster, rating, userRating, id } = film;
    const genresTags = genres.map((genre) => <Tag key={`${id}${genre}`}>{genre}</Tag>);
    const posterURL = () => {
      if (!poster) {
        return 'https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o=';
      }
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster}`;
    };

    return (
      <Layout className="cardWrapper" key={id}>
        <Sider width="183">
          <img alt="film poster" className="poster" src={posterURL()} />
        </Sider>
        <Layout className="cardInfo">
          <header className="title">
            <Title level={3} className="filmName">
              {filmName}
            </Title>
            <Progress type="circle" percent={0} format={() => `${rating}`} width={40} trailColor="#E9D100" />
          </header>
          <Text className="releaseDate">{releaseDate}</Text>
          <div className="tags">{genresTags}</div>
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
          <Rate count={10} allowHalf defaultValue={userRating} className="userRating" />
        </Layout>
      </Layout>
    );
  });

  return <div className="cards">{cards}</div>;
}
