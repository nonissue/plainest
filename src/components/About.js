import React from "react";
import { motion } from "framer-motion";

const variants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1
    }
  },
  exit: {
    opacity: 0
    // x: -1000
  }
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
      <p>Plainest.site is cooked up by @christiandy && @nonissue</p>
    </motion.div>
  );
}
