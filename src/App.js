import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { About, InstaGrid } from './pages';
import { Nav, Loading, ImageView } from './components';
import './App.css';

const AppWrapper = styled.div`
  text-align: center;
  color: #121212;
  font-family: 'Work Sans', sans-serif;

  header {
    /* background-color: #1a202c; */
    /* background-color: #121212; */
    /* width: 15vw; */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: fixed;
    padding: 5px 20px 15px 20px;
    left: 40vw;
    top: 1vw;
    z-index: 50;
    border-radius: 0.1em;
    background: hsla(0, 0%, 100%, 0.9);
    animation: fadein 0.3s;
    /* margin-top: 4vh; */
    /* margin-bottom: 4vh; */
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    font-size: calc(12px + 1.5vmin);
  }
  a:link,
  a:visiited {
    color: #121212;
  }

  header a:link,
  header a:visited {
    color: #121212;
    text-decoration: none;
  }

  h1 {
    font-size: 1em;
    margin: 0;
    text-transform: uppercase;
    font-family: 'Oswald', serif, sans-serif;
    letter-spacing: 0em;
    font-weight: 790;
    color: #121212;
  }
  h3 {
    margin-top: 0em;
    font-family: 'Lekton', sans-serif;
    font-weight: 300;
    color: #121212;
    margin-bottom: 0em;
    font-size: 0.6em;
    /* display: inline; */
  }
  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    color: #a0aec0;
    color: #697077;
    color: #838b94;
    font-weight: 600;
    margin-right: 0.1em;
  }
  i {
    color: #e2e8f0;
    opacity: 0.7;
    font-style: normal;
    font-family: 'Work Sans', sans-serif;
  }
  .url {
    font-weight: 300;
    display: inline;
    padding: 3px 6px;
    letter-spacing: 0.15em;
    font-size: 0.45em;
    border-radius: 0.25em;
    font-family: 'Oswald', sans-serif;
  }
  .footer {
    position: fixed;
    bottom: 1em;
    left: 1em;
    font-size: 0.7em;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
  }
`;

// this is ignored completely?

const variants = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    // scale: 1,
    transition: { duration: 0.2 },
  },
};

const variants2 = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0 },
  },
};

// home page
function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  // probably can be removed
  const [loaded, setLoaded] = useState(true);
  const location = useLocation();

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // setLoading(true);
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      setLoading(true);
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
    };

    // fetchData();
    // setLoading(false);
    fetchData().then(
      setTimeout(() => {
        setLoading(false);
        // setLoaded(true);
      }, 2000),
    );

    console.log('App effect called');

    // Fake timeout to ensure loading shows
    // Could be bad though as if the contents isnt actually loaded in time
    // it will be displayed
    // TODO possible solution? https://humble.dev/creating-a-nice-loading-button-with-react-hooks
  }, []);

  return (
    <AppWrapper>
      <header>
        <h1>
          <Link to="/">plain site</Link>
        </h1>

        <h3>
          <a href="https://instagram.com/plain.site">plain.site</a>
        </h3>
      </header>
      <Nav />
      <div>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={variants}
              >
                {/* if InstaGrid is rendered before posts are available, children dont get staggered */}
                {/* {!posts ? <Loading /> : <InstaGrid posts={posts} />} */}
                {loading ? <Loading /> : <InstaGrid posts={posts} />}
              </motion.div>
            </Route>
            <Route path="/images/:id">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={variants2}
              >
                {loading ? <Loading /> : <ImageView posts={posts} />}
              </motion.div>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <div className="footer">Copyright 2019 © plainsite</div>
    </AppWrapper>
  );
}

export default App;
