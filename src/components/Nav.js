import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavWrapper = styled.div`
  padding: 5px 8px 5px 5px;
  .nav {
    display: flex;
    flex-direction: row;
    /* width: 10vw; */
  }
  a,
  a:link,
  a:visited {
    padding: 0;
    display: block;
    margin: 0;
    /* box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06); */
    line-height: 2em;
    /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
    /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); */
    /* margin-right: 10px; */
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
    /* color: #fff; */
  }

  .nav-left {
    /* position: fixed; */
    /* top: 11vh;
    left: 6vh; */
    text-align: center;
    margin-right: 0.1em;
  }

  .nav-right {
    /* position: fixed; */
    /* top: 4.5vh;
    right: 2vh; */
    z-index: 1000;
    text-align: center;
  }

  @keyframes fadein {
    0% {
      background: #fff;
    }
    100% {
      opacity: #fff;
    }
  }
`;

export function Nav() {
  const location = useLocation();

  return (
    <NavWrapper>
      <div className="nav">
        {location.pathname === '/' ? (
          ''
        ) : (
          <AnimatePresence>
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
              exit={{ opacity: 0.5, scale: 2, transition: { duration: 5 } }}
              className="nav-left"
            >
              <Link to="/">⇦</Link>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="nav-right">
          <Link to="/about" alt="about page">
            ?
          </Link>
        </div>
      </div>
    </NavWrapper>
  );
}
export default Nav;
