import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useLocation, Link } from 'react-router-dom';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { About } from './pages';
import { Loading, PostView, AppHeader, Grid } from './components';
import './App.css';

const AppWrapper = styled.div`
  text-align: center;
  color: #121212;
  font-family: 'Work Sans', sans-serif;

  /* h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    color: #a0aec0;
    color: #697077;
    color: #838b94;
    font-weight: 600;
    margin-right: 0.1em;
  } */

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
    /* position: fixed; */
    opacity: 0.7;
    z-index: -50;
    display: flex;
    justify-content: center;
    bottom: 1em;
    left: 1em;
    font-size: 0.7em;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
  }
`;

// this is for the WHOLE homepage loading
const gridTransition = {
  enter: {
    opacity: 1,
    // scale: 1,
  },
  exit: {
    opacity: 0,
    y: 0,
    // scale: 0.5,
    transition: { duration: 0.2 },
  },
};

const postTransition = {
  enter: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

// so if a route isn't wrapped
function Error({ error }) {
  return (
    <motion.div initial={false} animate="enter" enter="enter" exit="exit" variants={gridTransition}>
      <h2>Error: {error.status}</h2>
      <p>{error.msg}</p>
      <Link to="/">Home!</Link>
    </motion.div>
  );
}

// home page
function App() {
  const [posts, setPosts] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({ status: null, msg: null });
  const location = useLocation();

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
    };

    try {
      fetchData();
      setLoaded(true);
      // setError({ status: '200', msg: 'loaded successfully' });
    } catch (err) {
      console.log(err);
      setError({ status: err.status, msg: err.message });
      // setLoaded(false);
    }

    setLoaded(false);
  }, []);

  return (
    <AppWrapper>
      <AppHeader />
      <div>
        {/* if we don't use exitBeforeEnter, post -> grid gridTransition sucks
        if we do, all route children components have to be wrapped in motion.div */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={gridTransition}
              >
                {/* if Grid is rendered before posts are available, children dont get staggered */}
                {!posts ? <Loading /> : <Grid posts={posts} />}
              </motion.div>
            </Route>
            <Route path="/images/:id">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={postTransition}
              >
                {!posts ? <Loading /> : <PostView posts={posts} />}
              </motion.div>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/error">
              <Error error={error} />
            </Route>
            <Route path="*">
              <Error error={{ status: 404, msg: 'Page not found!' }} />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <div className="footer">Copyright 2019 © plainsite</div>
    </AppWrapper>
  );
}

export default App;
