import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
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
    // zIndex: 0,
    x: 0
  },
  exit: {
    opacity: 1,
    scale: 0.5,
    x: 0,
    zIndex: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
      when: "afterChildren"
    }
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function InstaGrid({ posts }) {
  return (
    // <AnimatePresence exitBeforeEnter>
    <motion.div
      variants={list}
      key="list"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="image-grid"
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        {!!posts &&
          posts.map(post => (
            <GridItem post={post} key={post.id} variants={list} />
          ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default InstaGrid;
