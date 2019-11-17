import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const imageVariants = {
  hover: { scale: 1.05 }
};

const frameVariants = {
  hover: { scale: 0.95 }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function GridItem2({ post }) {
  return (
    <motion.div
      className="frame"
      variants={item}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      // transition={transition}
    >
      <Link to={"/images/" + post.id}>
        <motion.div
          whileHover="hover"
          variants={item}
          transition={imageVariants}
        >
          {(() => {
            if (post.images) {
              return (
                <img
                  // key={post.id}
                  alt={post.caption}
                  src={post.images.standard_resolution.url}
                />
              );
            }
            return null;
          })()}
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function GridItem3({ post }) {
  return (
    <Link to={"/images/" + post.id}>
      <img
        // key={post.id}
        alt={post.caption}
        src={post.images.standard_resolution.url}
      />
    </Link>
  );
}

const item = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0,
    x: 0,
    transition: {
      when: "afterChildren"
    }
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <motion.div
      key={post.id}
      initial="hidden"
      enter="visible"
      exit="hidden"
      variants={item}
    >
      {(() => {
        if (post.images) {
          // if (post) {
          return (
            <Link to={"/images/" + post.id}>
              <img
                alt={post.caption}
                key={post.images.standard_resolution.url}
                src={post.images.standard_resolution.url}
              />
            </Link>
          );
        }
        return null;
      })()}
    </motion.div>
  );
}

export default GridItem;
