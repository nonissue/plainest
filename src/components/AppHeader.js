import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Left, Question } from '@ant-design/icons';
import { Logo } from './Logo';

const StyledHeader = styled.header`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsla(0, 0%, 100%, 0.92);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(5px);
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
    /* border: 1px solid #ccc; */
  }
  .control {
    text-transform: uppercase;
    font-size: 0.8em;
    font-family: 'Lekton', monospace, sans-serif;
    /* width: 20vw; */
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.25em;
    margin-right: 1.25em;

    a,
    a:link,
    a:visited {
      color: #333;
      opacity: 9;
      text-decoration: none;
      transition: color 0.2s ease-out;
    }

    a:hover {
      opacity: 1;
      color: #ff0000;
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
          <Link to="/">
            <Left />
          </Link>
        </motion.div>
      ) : (
        <div className="control hidden">
          <Left />
        </div>
      )}
      <Logo />
      {!(location.pathname === '/about') ? (
        <div className="control">
          <Link to="/about">
            <Question />
          </Link>
        </div>
      ) : (
        <div className="control hidden">
          <Question />
        </div>
      )}
    </StyledHeader>
  );
}

export default AppHeader;