import React from "react";
import { motion } from "framer-motion";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
      duration: 1
    }
  },
  enter: {
    opacity: 1,
    x: 0
  },
  hidden: {
    opacity: 0,
    zIndex: 0
  },
  exit: {
    opacity: 0,
    x: -500,
    zIndex: 0,
    transition: {
      duration: 0.5
    }
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function InstaGrid({ posts }) {
  return (
    <motion.div
      variants={list}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="image-grid"
    >
      {!!posts && posts.map(post => <GridItem post={post} key={post.id} />)}
    </motion.div>
  );
}

export default InstaGrid;
