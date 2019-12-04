import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { About } from './pages';
import {
  Header,
  Error,
  Grid,
  Loading,
  // ModalItem,
  // PostItem,
  // PostModal,
  PostView,
  SinglePostView,
} from './components';
import './App.css';

const AppWrapper = styled.div`
  text-align: center;
  color: #121212;
  font-family: 'Work Sans', 'Helvetica', 'Arial', sans-serif;

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
    /* font-family: 'Oswald', sans-serif; */
  }

  .footer {
    /* z-index: -50; */
    opacity: 0;
    display: flex;
    justify-content: center;
    bottom: 1em;
    left: 1em;
    font-size: 0.7em;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    animation: fadein 1s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
    // scale: 0.5,
    transition: { duration: 1 },
  },
};

const postTransition = {
  enter: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// eslint-disable-next-line no-unused-vars
function getPostByID(posts, id) {
  return posts.find(p => p.id === id);
}

// eslint-disable-next-line no-unused-vars
function getPostIndex(posts, id) {
  return posts.findIndex(p => p.id === id);
}

// home page
function App() {
  const [posts, setPosts] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({ status: null, msg: null });
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
      // setLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error occurred: ');
      // eslint-disable-next-line no-console
      console.log(err);
      setError({ status: err.status, msg: err.message });
    }

    // setLoaded(false);
  }, []);

  return (
    <AppWrapper>
      <Header />
      <div>
        {/* if we don't use exitBeforeEnter, post -> grid gridTransition sucks
        if we do, all route children components have to be wrapped in motion.div */}
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch>
            <Route exact path="/">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={gridTransition}
              >
                {/* if Grid is rendered before posts are available, children dont get staggered */}
                {!posts ? (
                  <Loading />
                ) : (
                  <Grid posts={posts} setLoaded={setLoaded} loaded={loaded} />
                )}
              </motion.div>
            </Route>
            <Route path="/images/:id">
              <motion.div
                // initial
                animate="enter"
                enter="enter"
                exit="exit"
                variants={postTransition}
              >
                {!posts ? <Loading /> : <PostView posts={posts} />}
              </motion.div>
            </Route>
            <Route
              path="/posts/:id"
              render={
                posts &&
                (props => (
                  <motion.div
                    // initial
                    animate="enter"
                    enter="enter"
                    exit="exit"
                    variants={postTransition}
                  >
                    <SinglePostView posts={posts} {...props} />
                  </motion.div>
                ))
              }
            >
              {/* <SinglePostView match={match} history={history} /> */}
              {/*  */}
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/error/:id">
              <Error error={error} />
            </Route>
            <Route path="*">
              <Error error={{ status: '404', msg: 'Page not found!' }} />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      {/* {background && (
        <Route path="/images/:id">
          {!posts ? (
            <Loading />
          ) : (
            // pass in specific post?
            <PostModal location={location} history={history}>
              <ModalItem posts={posts} />
            </PostModal>
          )}
        </Route>
      )} */}
      {/* <div className="footer">Copyright 2019 © plainsite</div> */}
    </AppWrapper>
  );
}

export default App;
