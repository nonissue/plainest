import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import { history } from './history';
import { About } from './pages';
import { Header, Error as ErrorPage, NewGrid, Loading } from './components';
// import { testPosts } from './posts';
import './App.css';

/*

Theme stuff:
body text: #032d4d;
link hover: hsla(205.9, 85.3%, 40%, 1);
logo color: #054B81;
text-underline: hsla(205.9, 92.3%, 40%, 0.5);

font-families?
box-shadows?

darkmode lightmode?


*/

const AppWrapper = styled.div`
  text-align: center;
  color: #032d4d;
  /* -webkit-transform: translate3d(0px, 0px, 0px); */
  /* font-family: 'Work Sans', 'Helvetica', 'Arial', sans-serif; */

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
The same newgrid component is serverd for both the root route and for the /posts/:id route
This is so that, when a post is clicked, we can render the individual post modal above 
the rest of the posts AND update the url at the same time.
Routing to the individual post is easy but we would wouldn't be able to have modal appear
ABOVE the existing post grid.

Issues: How we do serve 404 whne a visit to /post/:id isn't a valid post?

*/
function App() {
  const defaultError = { code: 500, msg: 'An unexpected error occurred!' };

  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Route exact path={['/posts/:id', '/']} component={props => <NewGrid {...props} />} />
          <Route path="/about">
            <About />
          </Route>
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
