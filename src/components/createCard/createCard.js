import { Tag } from 'antd';

export default function CreateCard(props) {
  const { filmsData } = props;
  const { filmName, description, releaseDate, genres } = filmsData;
  const genresTags = genres.map((genre) => {
    return <Tag>{genre}</Tag>;
  });
  return (
    <div className="cardWrapper">
      <img />
      <div className="cardInfo">
        <h2>{filmName}</h2>
        <span>{releaseDate}</span>
        <div className="tags">{genresTags}</div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}
