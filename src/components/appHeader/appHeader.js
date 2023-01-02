export default function AppHeader(props) {
  return (
    <header className="header">
      <form>
        <ul>
          <li className="active">
            <label>
              <input type="radio" />
              Search
            </label>
          </li>
          <li>
            <label>
              <input type="radio" />
              Rated
            </label>
          </li>
        </ul>
        <input className="search-line" placeholder="What film are you looking for?" />
      </form>
    </header>
  );
}
