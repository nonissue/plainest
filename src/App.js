import { Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import './App.css';
import { Error as ErrorPage, Grid, Header, LoadingBar } from './components';
import { About } from './pages';

/*

Theme stuff:
body text: #032d4d;
link hover: hsla(205.9, 85.3%, 40%, 1);
logo color: #054B81;
text-underline: hsla(205.9, 92.3%, 40%, 0.5);
darker-blue: color: #021728;

font-families?
box-shadows?

darkmode lightmode?

*/

const AppWrapper = styled.div`
  text-align: center;
  color: #032d4d;

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

/*
The same Grid component is serverd for both the root route and for the /posts/:id route
This is so that, when a post is clicked, we can render the individual post modal above 
the rest of the posts AND update the url at the same time.
Routing to the individual post is easy but we would wouldn't be able to have modal appear
ABOVE the existing post grid.

Issues: How we do serve 404 whne a visit to /post/:id isn't a valid post?

*/

export function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.3, delay: isSelected ? 0 : 0 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    />
  );
}

function App() {
  const defaultError = { code: 500, msg: 'An unexpected error occurred!' };
  const [isSelected, setIsSelected] = useState(true);

  const dismissModal = e => {
    e.preventDefault();

    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const dismissModal = event => {
      if (isSelected && event.key === 'Escape') {
        setIsSelected(!isSelected);
      }
    };

    window.addEventListener('keydown', dismissModal);

    return () => {
      window.removeEventListener('keydown', dismissModal);
    };
  }, [isSelected]);

  return (
    <AppWrapper>
      <Header />

      {isSelected && (
        <>
          <Overlay isSelected style={{ opacity: '0.9 !important' }} />
          <div className="alert">
            <h3>Update: </h3>
            <h2>Facebook Does Facebooky Things</h2>
            <p>
              Instagram recently implemented a change in policy,{' '}
              <a href="https://manualdousuario.net/instagram-photos-videos-unlogged-on-computers/">
                requiring all viewers of IG media to have an account
              </a>
              . This has caused the site to break. I will be fixing it ASAP.
            </p>

            <button onClick={() => setIsSelected(false)} type="button">
              Dismiss
            </button>
          </div>
        </>
      )}
      <div>
        <Switch>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Route exact path={['/posts/:id', '/']} component={props => <Grid {...props} />} />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/loadingbar" component={LoadingBar} />
          <Route exact path={['/error', '/error/:id']}>
            <ErrorPage error={defaultError} />
          </Route>
          <Route path="*">
            <ErrorPage error={{ code: 404, msg: 'Page not found!' }} />
          </Route>
        </Switch>
      </div>
      <div className="footer">Copyright 2019 © plainsite</div>
    </AppWrapper>
  );
}

export default App;
