import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutWrapper = styled.div`
  /* color: #121212;*/
  color: #032d4d;
  width: 50vw;
  margin: 0px auto;
  padding-top: 5vw;
  max-width: 500px;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.5em;
  text-align: center;
  font-family: 'Lekton', monospace;

  h3 {
    /* font-family: 'Open Sans'; */
    font-family: 'Bebas Neue', 'Helvetica', sans-serif;
    font-weight: 400;
    /* text-transform: uppercase; */
    letter-spacing: 0.1em;
    text-align: center;
  }

  b {
    font-style: normal;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    font-weight: 600;
  }

  a:link,
  a:visited {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: hsla(205.9, 92.3%, 40%, 0.5);
    text-underline-offset: 0.1rem;
    font-weight: 700;
    transition: all 0.1s ease-out;
  }

  a:hover {
    color: #fa6400;
    color: hsla(205.9, 85.3%, 40%, 1);
    text-decoration-color: transparent;
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
        <h3>About</h3>
        <p>
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
