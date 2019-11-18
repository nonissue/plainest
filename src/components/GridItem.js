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
  enter: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5
    }
  },
  exit: {
    transition: {
      when: "afterChildren",
      duration: 3
    },
    opacity: 0,
    scale: 0.5
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <motion.div initial="hidden" enter="enter" exit="hidden" variants={item}>
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
  );
}

export default GridItem;
