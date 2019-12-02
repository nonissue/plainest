import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useLocation } from 'react-router-dom';

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
    transition: { duration: 0.3 },
  },
};

// home page
function App() {
  const [posts, setPosts] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      setLoading(true);
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <AppWrapper>
      <AppHeader />
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
                variants={variants2}
              >
                {!posts ? <Loading /> : <PostView posts={posts} />}
              </motion.div>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      {/* <div className="footer">Copyright 2019 © plainsite</div> */}
    </AppWrapper>
  );
}

export default App;
