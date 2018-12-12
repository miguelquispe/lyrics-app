import React from "react";
import { PropTypes } from "prop-types";
import Song from "./Song";
import Loader from "./Loader";

// https://api.vagalume.com.br/search.php?musid=l3ade68b6g7f86fda3
const API_URL = "https://api.vagalume.com.br/search.php";
const API_KEY = "e2f608af4032ee66b83bdc3822d2422e"; // YOUR_API_KEY

class Lyric extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistName: "",
      songName: "",
      songAlbum: "",
      songLyric: "",
      songURL: ""
    };
  }

  componentDidMount() {
    this.getLyric();
  }

  getLyric() {
    const musid = this.props.musid;

    this.setState({
      loading: true
    });

    fetch(`${API_URL}?musid=${musid}&extra=alb&apikey=${API_KEY}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          // artist name
          if (data.art.name) {
            this.setState({
              artistName: data.art.name
            });
          }

          // data
          if (data.mus && data.mus.length > 0) {
            if (Array.isArray(data.mus)) {
              let music = data.mus[0];

              this.setState({
                loading: false,
                songName: music.name,
                songURL: music.url,
                songLyric: music.text,
                songAlbum: music.alb ? music.alb.name : ""
              });
            }
          }
        }
      })
      .catch(error => {
        console.log("fetch::data", error);
      });
  }

  render() {
    const {
      songLyric,
      songName,
      artistName,
      songAlbum,
      songURL,
      loading
    } = this.state;

    if (loading) {
      return (
        <div className="app__container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app__container">
        {/*loading && <div className="loader" /> */}
        <Song
          title={songName}
          artist={artistName}
          album={songAlbum}
          url={songURL}
        />
        <div className="song__lyric item ">
          <pre>{songLyric}</pre>
        </div>
      </div>
    );
  }
}

Lyric.propTypes = {
  loading: PropTypes.bool,
  artistName: PropTypes.string,
  songName: PropTypes.string,
  songAlbum: PropTypes.string,
  songLyric: PropTypes.string,
  songURL: PropTypes.string
};

export default Lyric;
