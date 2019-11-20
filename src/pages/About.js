import React from 'react';
import { motion } from 'framer-motion';

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
  );
}

export default About;
