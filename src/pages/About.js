import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutWrapper = styled.div`
  color: #fff;
  width: 50vw;
  margin: 0px auto;
  max-width: 400px;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.5em;
  font-family: 'Lekton', monospace;

  i {
    font-style: normal;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    font-weight: 600;
  }

  a:link,
  a:visited {
    color: #fff;
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
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
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
          <i>About</i>
          <br />
          "A kuest for klout™️"
          <br />
          Cooked up sporadically by{' '}
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
