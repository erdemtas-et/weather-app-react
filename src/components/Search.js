import { FaSearch } from "react-icons/fa";

function Search({ submitSearch }) {
  return (
    <div className="search-box">
      <div className="input-container">
        <form onSubmit={submitSearch}>
          <input
            className="input"
            type="text"
            name="city"
            placeholder="Search a city"
          />
          <button type="submit">
            <FaSearch className="search-button-fa"></FaSearch>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
