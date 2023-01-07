import { Tag } from 'antd';
import { Component } from 'react';
import './createCard.css';

export default class CreateCard extends Component {
  render() {
    const { filmsData } = this.props;
    const cards = filmsData.map((film) => {
      const { filmName, description, releaseDate, genres } = film;
      const genresTags = genres.map((genre) => <Tag>{genre}</Tag>);
      return (
        <div className="cardWrapper">
          <img
            className="poster"
            alt="film poster"
            src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/q719jXXEzOoYaps6babgKnONONX.jpg"
          />
          <div className="cardInfo">
            <h2 className="filmName">{filmName}</h2>
            <span className="releaseDate">{releaseDate}</span>
            <div className="tags">{genresTags}</div>
            <p className="description">{description}</p>
          </div>
        </div>
      );
    });

    return <div className="cards">{cards}</div>;
  }
}
