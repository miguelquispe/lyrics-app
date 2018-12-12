import React from "react";
import Search from "./Search";
import Song from "./Song";
import Loader from "./Loader";

const API_URL = "https://api.vagalume.com.br/search.excerpt?q=";
const API_KEY = "e2f608af4032ee66b83bdc3822d2422e"; // YOUR_API_KEY

class SetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      songs: [],
      loading: false
    };
  }

  handleSearchInput = query => {
    this.setState({
      query
    });
  };

  handleSearchSubmit = e => {
    this.getSongs();
    e.preventDefault();
  };

  handleSearchButton = () => {
    this.getSongs();
  };

  getSongs() {
    const { query } = this.state;
    this.setState({
      loading: true,
      songs: []
    });

    fetch(`${API_URL}${query}&apikey=${API_KEY}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        if (data.response && data.response.docs) {
          this.setState({
            songs: data.response.docs,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log("fetch::data", error);
      });
  }

  render() {
    const { songs, loading } = this.state;

    return (
      <div className="app__container">
        <Search
          query={this.state.query}
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />

        {loading ? (
          <Loader />
        ) : (
          songs.length > 0 &&
          songs.map(song => {
            return (
              <Song
                key={song.id}
                title={song.title}
                artist={song.band}
                musid={song.id}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default SetList;
