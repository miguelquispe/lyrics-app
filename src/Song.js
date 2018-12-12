import React, { Fragment } from "react";
import { Link } from "@reach/router";
import { PropTypes } from "prop-types";

import Icon from "./icon";
/**
 * Item properties
 * id: "l3ade68b8gec6e40b3"
 * langID: 2
 * url: "/michael-jackson/chicago.html"
 * title: "Chicago"
 * band: "Michael Jackson"
 */
const Detail = props => {
  return (
    <Fragment>
      <div className="song__detail">
        <span className="song__title">{props.title}</span>
        <span className="song__author">
          {props.album && props.album + " •"} {props.artist}
        </span>

        {props.url && (
          <a className="song__url" href={props.url} target="_blank">
            Open in Vagalume
          </a>
        )}
      </div>
      <Icon name="note" width="32px" />
    </Fragment>
  );
};

class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Songs::componentDidMount");
  }

  render() {
    if (!this.props.musid) {
      return (
        <div className="song item">
          <div className="song__item">
            <Detail {...this.props} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="song item">
          <Link className="song__item" to={`/lyric/${this.props.musid}`}>
            <Detail {...this.props} />
          </Link>
        </div>
      );
    }
  }
}

Song.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired
};

export default Song;
