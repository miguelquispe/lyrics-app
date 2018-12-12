import React from "react";
import Icon from "./icon";

const Search = props => (
  <div className="search">
    <form
      onSubmit={e => {
        props.handleSearchSubmit(e);
      }}
    >
      <input
        name="search"
        value={props.query}
        placeholder="Search title..."
        autoComplete="off"
        required
        onChange={e => {
          props.handleSearchInput(e.target.value);
        }}
        className="search__input"
      />
      <button className="search__btn" type="submit">
        <Icon name="lens" fill="#ccd0dc" />
      </button>
    </form>
  </div>
);

export default Search;
