import React, { Component } from "react";
// import logo from "./logo.svg"
import "./App.css";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/.netlify/functions/instagram")
      // takes response stream and return a promise with body text as json
      .then(response => response.json())
      // when our previous promise resolves and we know we have gotten our full stream
      // then update the state
      .then(data => this.setState({ loading: false, posts: data }));
  }

  newInstagram = () => e => {
    e.preventDefault();
    this.setState({ loading: true });
    fetch("/.netlify/functions/instagram")
      // takes response stream and return a promise with body text as json
      .then(response => response.json())
      // when our previous promise resolves and we know we have gotten our full stream
      // then update the state
      .then(data => this.setState({ loading: false, posts: data }));
  }

  render() {
    const { loading, posts } = this.state;
    return (
      <div>
        {/* <p>
          <button onClick={this.newInstagram()}>
            {loading ? "Loading..." : "Get Instagram"}
          </button>
        </p> */}

        {!!loading && <h1>Loading...</h1> }

        {!!posts &&
          posts.map(post => (
            <div key={post.id}>
              {/* <p>{post.msg}</p> */}
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
