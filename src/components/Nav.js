import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// TODO: Readd nav
const NavWrapper = styled.div`
  padding: 5px 8px 5px 5px;
  display: flex;
  flex-direction: row;

  a,
  a:link,
  a:visited {
    padding: 0;
    display: block;
    margin: 0;
    line-height: 2em;
    border-radius: 2em;
    width: 2em;
    height: 2em;
    padding: 2px;
    background: #fff;
    color: #333;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.2s linear;
    border: 1px solid hsla(0, 0%, 10%, 0.4);
  }

  a:hover {
    border: 1px solid #fff;
    color: #fff;
    background-color: #121212;
  }

  .nav-left {
    text-align: center;
    margin-right: 0.1em;
  }

  .nav-right {
    z-index: 1000;
    text-align: center;
  }
`;

export function Nav() {
  const location = useLocation();

  return (
    <NavWrapper>
      {!(location.pathname === '/') && (
        <motion.div
          key="back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
          exit={{ opacity: 0.5, scale: 2, transition: { duration: 5 } }}
          className="nav-left"
        >
          <Link to="/">⇦</Link>
        </motion.div>
      )}
      <div className="nav-right">
        <Link to="/about" alt="about page">
          ?
        </Link>
      </div>
    </NavWrapper>
  );
}

export default Nav;
