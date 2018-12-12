import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SetList from "./SetList";
import Lyric from "./Lyric";
import Credits from "./Credits";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <Link to="/" className="app__title">
            MQ Lyrics App
          </Link>
        </header>
        <div className="app__body">
          <Router>
            <SetList path="/" />
            <Lyric path="/lyric/:musid" />
          </Router>
        </div>
        <Credits />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
