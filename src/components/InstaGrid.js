import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0
    }
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0
  },
  hidden: {
    // scale: 0.5,
    x: -1000,
    opacity: 0,
    zIndex: 0
    // transition: {
    //   when: "beforeChildren"
    // }
  },
  exit: {
    opacity: 0,
    x: -500,
    zIndex: 0,
    transition: {
      // when: "afterChildren",
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
      enter="visible"
      exit="exit"
      className="image-grid"
    >
      {/* {console.log("posts", posts)} */}
      {!!posts && posts.map(post => <GridItem post={post} />)}
    </motion.div>
    // </AnimatePresence>
  );
}

export default InstaGrid;
