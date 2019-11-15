import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const imageVariants = {
  hover: { scale: 1.1 }
};

const frameVariants = {
  hover: { scale: 0.9 }
};

const item = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ...transition
    }
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
      duration: 2.5,
      ...transition
    }
  },
  ...imageVariants
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function GridItem({ post }) {
  return (
    <motion.div
      className="frame"
      variants={frameVariants}
      whileHover="hover"
      transition={transition}
    >
      <AnimatePresence>
        <motion.div
          key={post.id * 3}
          initial="hidden"
          enter="visible"
          exit="exit"
          whileHover="hover"
          variants={item}
          transition={transition}
        >
          {(() => {
            if (post.images) {
              return (
                <Link to={"/images?src=" + post.images.standard_resolution.url}>
                  <motion.img
                    key={post.images.standard_resolution.url}
                    src={post.images.standard_resolution.url}
                  />
                </Link>
              );
            }
            return null;
          })()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default GridItem;
