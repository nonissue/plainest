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

async function getPosts() {
  let res;

  try {
    res = await axios('/.netlify/functions/posts-read-latest');
    // throw new Error({ code: 500, msg: 'Couldnt fetch posts' });
  } catch (err) {
    throw new Error('Couldnt fetch posts');
  }
  return res.data.data.posts;
}

// home page
function App() {
  const [error, setError] = useState({ code: undefined, msg: undefined });
  // const [posts, setPosts] = useState([]);

  // not really utilized ATM

  /* hmmmmmmmmmmmmmmmmmmm
  If I fetch posts here, they are fetched on every route...
  // */
  // useEffect(() => {
  //   setError({ code: undefined, msg: undefined });
  //   //   // Should check last fetch, and if it is stale, run posts-hydrate
  //   //   const fetchData = async () => {
  //   //     try {
  //   //       const fetchedPosts = await getPosts();
  //   //       setPosts(fetchedPosts);
  //   //     } catch (err) {
  //   //       setError({ code: 500, msg: 'Error fetching posts!' });
  //   //     }
  //   //   };

  //   //   fetchData();
  //   //   setIsLoading(false);
  // }, []);

  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          <Route exact path={['/posts/:id', '/']} component={props => <NewGrid {...props} />} />
          <Route path="/about">
            <About />
          </Route>
          <Route exact path={['/error', '/error/:id']}>
            <ErrorPage error={error} />
          </Route>
          {/* <Route path="/bar" component={LoadingBar} /> */}

          <Route path="*">
            <ErrorPage error={{ code: 404, msg: 'Page not found!' }} />
          </Route>
        </Switch>
        {/* This is such a brain dead way to do this, but it's 4 am 
        look at this: https://www.robinwieruch.de/react-hooks-fetch-data */}
        {error.code && (error.msg ? error.msg : 'An unknown error has occurred')}
      </div>
      <div className="footer">Copyright 2019 © plainsite</div>
    </AppWrapper>
  );
}

export default App;
