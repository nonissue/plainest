import React, { useState, useEffect } from 'react';

import { Switch, Route, Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { About, InstaGrid } from './pages';
import { Nav, Loading, ImageView } from './components';
import './App.css';

const variants = {
  enter: {
    opacity: 1,
    transition: {
      delay: 0,
    },
  },
  exit: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.2 },
  },
};

const variants2 = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

// home page
function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(true);
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

    fetchData().then(
      setTimeout(() => {
        setLoading(false);
        setLoaded(true);
      }, 1000),
    );

    // Fake timeout to ensure loading shows
    // Could be bad though as if the contents isnt actually loaded in time
    // it will be displayed
    // TODO possible solution? https://humble.dev/creating-a-nice-loading-button-with-react-hooks
  }, []);

  return (
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
                {loading ? <Loading /> : <InstaGrid posts={posts} loaded={loaded} />}
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
    </div>
  );
}

export default App;
