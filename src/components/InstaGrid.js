import React from "react";
import { motion } from "framer-motion";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3
    }
  },
  enter: {
    opacity: 1
  },
  hidden: {
    opacity: 0,
    staggerChildren: 0.2
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};
// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function InstaGrid({ posts }) {
  return (
    <motion.div
      variants={list}
      initial={false}
      animate="visible"
      enter="visible"
      exit="exit"
      className="image-grid"
    >
      {!!posts && posts.map(post => <GridItem post={post} key={post.id} />)}
    </motion.div>
    // </AnimatePresence>
  );
}

export default InstaGrid;
