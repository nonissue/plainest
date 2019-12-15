import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { About } from './pages';
import { Header, Error, NewGrid, LoadingBar } from './components';
import './App.css';

const AppWrapper = styled.div`
  text-align: center;
  color: #121212;
  font-family: 'Work Sans', 'Helvetica', 'Arial', sans-serif;

  .url {
    font-weight: 300;
    display: inline;
    padding: 3px 6px;
    letter-spacing: 0.15em;
    font-size: 0.45em;
    border-radius: 0.25em;
  }

  .footer {
    opacity: 0;
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.7em;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    animation: fadein 1s;
    animation-delay: 1.5s;
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

// eslint-disable-next-line no-unused-vars
function getPostByID(posts, id) {
  return posts.find(p => p.id === id);
}

// eslint-disable-next-line no-unused-vars
function getPostIndex(posts, id) {
  return posts.findIndex(p => p.id === id);
}

async function getPosts() {
  let res;

  try {
    res = await axios('/.netlify/functions/posts-read-latest');
    // return res.data.data.posts;
  } catch (err) {
    console.log('Getposts error');
    // throw new Error('getPosts error');
  }
  return res.data.data.posts;
}

// home page
function App() {
  const [posts, setPosts] = useState([]);

  // not really utilized ATM
  const [error, setError] = useState({ status: null, msg: null });
  useEffect(() => {
    setError({ status: '500', msg: 'Unknown error occurred.' });
  }, []);

  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchData();
    // fake delay so loading shows
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          <Route
            exact
            path={['/posts/:id', '/']}
            component={props => <NewGrid posts={posts} {...props} />}
          />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/error/:id">
            <Error error={error} />
          </Route>
          <Route path="/bar" component={LoadingBar} />

          <Route path="*">
            <Error error={{ status: '404', msg: 'Page not found!' }} />
          </Route>
        </Switch>
      </div>
      <div className="footer">Copyright 2019 © plainsite</div>
    </AppWrapper>
  );
}

export default App;
