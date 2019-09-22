import React, { Component } from "react";
// import logo from "./logo.svg"
import "./App.css";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  newInstagram = () => e => {
    e.preventDefault();
    fetch("/.netlify/functions/instagram")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .then(json => this.setState({ loading: false, msg: json }));
      // .then(json => this.setState({ loading: false, msg: json }));
  }

  // lol im using axios and fetch?
  fetchInstagram = () => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/instagram")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .then(json => this.setState({ loading: false, msg: json }));
  };

  render() {
    const { loading, msg } = this.state;
    return (
      <div>
        <p>
          <button onClick={this.newInstagram()}>
            {loading ? "Loading..." : "Get Instagram"}
          </button>
        </p>

        {!!msg &&
          msg.map(post => (
            <div key={post.id}>
              <p>{post.msg}</p>
              {(() => {
                if (post.images) {
                  return (
                    
                    <img
                      src={post.images.standard_resolution.url}
                      alt={post.caption}
                    />
                  );
                }
                return null;
              })()}
            </div>
          ))}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            <a href="https://instagram.com/plain.site">
              plain<i>.</i>site
            </a>
          </h3>
          {/* <h3><a href="https://instagram.com/plain.site">plain.site</a></h3> */}
          <div>{/* <span className="url" >https://plainest.site</span> */}</div>
          <LambdaDemo />
        </header>
      </div>
    );
  }
}

export default App;
