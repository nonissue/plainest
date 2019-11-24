import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './Nav';

const HeaderWrapper = styled.header`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: fixed;
  /* padding: 0px 8px 5px 5px; */
  /* left: 2vh; */
  /* top: 4.5vh; */
  z-index: 50;
  background: hsla(0, 0%, 100%, 1);
  animation: fadein 0.3s;
  font-size: calc(12px + 1.5vmin);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* width: 100%; */

  .logo {
    padding: 0px 8px 5px 5px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    text-align: left;

    a,
    a:link,
    a:visited {
      color: #121212;
      text-decoration: none;
    }
  }

  h1 {
    font-size: 1em;
    margin: 0;
    text-transform: uppercase;
    font-family: 'Work Sans', serif, sans-serif;
    letter-spacing: -0.05em;
    font-weight: 700;
    color: #121212;
    color: #fff;
  }

  h3 {
    margin-top: 0em;
    font-family: 'Lekton', sans-serif;
    font-weight: 300;
    color: #121212;
    margin-bottom: 0em;
    font-size: 0.6em;
    margin-left: 0.1em;
    text-decoration: underline;
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
`;

function Logo() {
  return (
    <div className="logo">
      <h1>
        <Link to="/">plain site</Link>
      </h1>

      <h3>
        <a href="https://instagram.com/plain.site">plain.site</a>
      </h3>
    </div>
  );
}

export function AppHeader() {
  return (
    <HeaderWrapper>
      <Logo />
      <Nav />
    </HeaderWrapper>
  );
}

export default AppHeader;
