import React from "react";
import { motion } from "framer-motion";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.5,
      delayChildren: 0.1
    }
  },
  enter: {
    opacity: 1
  },
  hidden: {
    // opacity: 0,
    staggerChildren: 0.2
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      staggerChildren: 0
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
