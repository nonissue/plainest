import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavWrapper = styled.div`
  a,
  a:link,
  a:visited {
    padding: 0;
    display: block;
    margin: 0;
    /* box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06); */
    line-height: 2em;
    margin-right: 10px;
    border-radius: 2em;
    width: 2em;
    height: 2em;
    padding: 2px;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.2s linear;
    border: 1px solid hsla(0, 0%, 100%, 0.4);
  }

  a:hover {
    border: 1px solid #fff;
    color: hsla(228.8, 18%, 12%, 0.9);
    background-color: #fff;
    /* color: #fff; */
  }

  .nav-left {
    position: absolute;
    top: 5vh;
    left: 4vh;
  }

  .nav-right {
    position: fixed;
    top: 5vh;
    right: 4vh;
    z-index: 1000;
  }

  @keyframes fadein {
    0% {
      background: #333;
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
              <Link to="/">{'⇦'}</Link>
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
