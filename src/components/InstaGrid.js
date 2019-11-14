import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { GridItem } from "./GridItem";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  }
};
// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function InstaGrid({ posts }) {
  return (
    // <AnimatePresence>
    <motion.div
      variants={list}
      initial="hidden"
      animate="visible"
      className="image-grid"
    >
      {/* {console.log("posts", posts)} */}
      {!!posts && posts.map(post => <GridItem post={post} />)}
    </motion.div>
    // </AnimatePresence>
  );
}

export default InstaGrid;
