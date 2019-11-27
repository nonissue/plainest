import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

// TODO: Loading indicator on header lower border?
// OR top of page?
// TODO: make nav just absolute positioned?
// TODO: [done] fix nav shift on imageview
// TODO: media queries for nav button sizes
// TODO: I dunno about the centered nav
const StyledHeader = styled.header`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsla(0, 0%, 100%, 0.95);
  animation: fadein 0.3s;
  font-size: calc(12px + 1.5vmin);
  border: 0px solid #ccc;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid #ccc; */
  }
  .control {
    text-transform: uppercase;
    font-size: 0.75em;
    font-family: 'Lekton', monospace, sans-serif;
    width: 20vw;
    /* text-align: center; */

    a,
    a:link,
    a:visited {
      text-decoration: none;
      color: blue;
    }
  }
  .hidden {
    visibility: hidden;
  }
`;

export function AppHeader() {
  const location = useLocation();
  return (
    <StyledHeader>
      {!(location.pathname === '/') ? (
        <motion.div
          key="back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
          exit={{ opacity: 1, scale: 1, transition: { duration: 5 } }}
          className="control"
        >
          <Link to="/">BACK</Link>
        </motion.div>
      ) : (
        <div className="control hidden">back</div>
      )}
      <Logo />
      {!(location.pathname === '/about') ? (
        <div className="control">
          <Link to="/about">ABOUT</Link>
        </div>
      ) : (
        <div className="control hidden">about</div>
      )}
      {/* <Nav /> */}
    </StyledHeader>
  );
}

export default AppHeader;
