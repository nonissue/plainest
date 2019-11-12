import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Nav, Loading, InstaGrid, ImageView } from "./components";
import "./App.css";

function About() {
  return (
    <div class="about">
      <p>Plainest.site is cooked up by @christiandy && @nonissue</p>
    </div>
  );
}

// home page
function App() {
  // let loading = true;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/.netlify/functions/instagram");
      setPosts(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>plain site</h1>
          <h3>
            <a href="https://instagram.com/plain.site">plain.site</a>
          </h3>
          <Nav />
        </header>
        <div>
          <Switch>
            <Route exact path="/">
              {loading ? <Loading /> : <InstaGrid posts={posts} />}
              {/* <InstaGrid posts={posts} /> */}
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
