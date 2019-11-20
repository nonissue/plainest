import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridItem } from "../components/GridItem";

const list = {
  visible: loaded => ({
    opacity: 1,
    transition: {
      staggerChildren: loaded ? 0.5 : 0.5,
      duration: 1
    }
  }),
  alreadyLoaded: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      duration: 1
    }
  },
  enter: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 1,
    scale: 0.5,
    zIndex: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 1,
      when: "beforeChildren"
    }
  }
};

export function InstaGrid({ posts }, loaded) {
  return (
    <motion.div
      variants={list}
      key="list"
      initial="hidden"
      animate={loaded ? "visible" : "visible"}
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
