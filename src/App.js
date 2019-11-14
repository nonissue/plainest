import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Nav, Loading, InstaGrid, ImageView } from "./components";
import "./App.css";

import api from "./utils/api";

function About() {
  return (
    <div className="about">
      <p>Plainest.site is cooked up by @christiandy && @nonissue</p>
    </div>
  );
}

// home page
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/.netlify/functions/instagram");
      setPosts(res.data);
      setLoading(false);
    };
    fetchData();

    // api.create(posts[0]).then((response) => {
    //   console.log(response)
    //   // remove temporaryValue from state and persist API response
    //   // const persistedState = removeOptimisticTodo(todos).concat(response)
    //   // Set persisted value to state
    //   // this.setState({
    //   //   todos: persistedState
    //   // })
    // }).catch((e) => {
    //   console.log('An API error occurred', e)
    //   // const revertedState = removeOptimisticTodo(todos)
    //   // Reset to original state
    //   // this.setState({
    //   //   todos: revertedState
    //   // })
    // });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1>plain site</h1>
          </Link>
          <a href="https://instagram.com/plain.site">
            <h3>plain.site</h3>
          </a>
          <Nav />
        </header>
        <div>
          <Switch>
            <Route exact path="/">
              {loading ? <Loading /> : <InstaGrid posts={posts} />}
            </Route>
            <Route path="/images">
              <ImageView />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
