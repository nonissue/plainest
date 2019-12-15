import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutWrapper = styled.div`
  color: #121212;
  width: 50vw;
  margin: 0px auto;
  padding-top: 5vw;
  max-width: 500px;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.5em;
  text-align: left;
  font-family: 'Lekton', monospace;

  h3 {
    text-align: center;
  }

  b {
    font-style: normal;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    font-weight: 600;
    color: #121212;
  }

  a:link,
  a:visited {
    color: #121212;
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    color: #ff0000;
  }
`;

const variants = {
  enter: {
    opacity: 1,
    transition: {
      // delay: 0.1,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 1,
  },
};

export function About() {
  return (
    <AboutWrapper>
      <motion.div
        className="about"
        initial="exit"
        animate="enter"
        enter="enter"
        exit="exit"
        variants={variants}
      >
        <p>
          <h3>About</h3>
          &quot;Boring photos of buildings&quot; <i>aka</i> &quot;A kuest for klout™️&quot; cooked
          up sporadically by{' '}
          <a href="https://www.instagram.com/christiandy/" alt="christiandy instagram">
            @christiandy
          </a>{' '}
          &&{' '}
          <a href="https://www.instagram.com/christiandy/" alt="nonissue instagram">
            @nonissue
          </a>
        </p>
      </motion.div>
    </AboutWrapper>
  );
}

export default About;
