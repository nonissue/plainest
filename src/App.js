import { Switch, Route, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { About } from './pages';
import { Header, Error, NewGrid } from './components';
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

// home page
function App() {
  const [error, setError] = useState({ status: null, msg: null });
  useEffect(() => {
    setError({ status: '500', msg: 'Unknown error occurred.' });
  }, []);

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook

  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          <Route exact path={['/posts/:id', '/']} component={NewGrid} />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/error/:id">
            <Error error={error} />
          </Route>
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
