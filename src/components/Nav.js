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
    line-height: 2em;
    margin-right: 10px;
    border-radius: 1.5em;
    width: 2em;
    height: 2em;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
  }

  a:hover {
    border: 1px solid #fff;
    background: #fff;
    color: #333;
  }

  .nav-left {
    position: absolute;
    top: 5vh;
    left: 4vh;
  }

  .nav-right {
    position: absolute;
    top: 5vh;
    right: 4vh;
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
              <Link to="/">{'<'}</Link>
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
