import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const imageVariants = {
  hover: { scale: 1.05 }
};

// eslint-disable-next-line no-unused-vars
const frameVariants = {
  hover: { scale: 0.95 }
};

const item = {
  visible: {
    opacity: 1,
    x: 0
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.4,
      duration: 2.5
    }
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <AnimatePresence>
      <motion.div
        key={post.id + 3}
        initial="hidden"
        enter="visible"
        exit="exit"
        variants={item}
      >
        {post.images ? (
          <Link to={"/images/" + post.id}>
            <img
              alt={post.caption}
              key={post.id + "image"}
              src={post.images.standard_resolution.url}
            />
          </Link>
        ) : (
          ""
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default GridItem;
