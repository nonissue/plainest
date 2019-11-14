import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 30 }
};

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const imageVariants = {
  exit: { y: "50%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition
  }
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <AnimatePresence>
      <motion.div
        key={post.id}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        variants={item}
      >
        {(() => {
          if (post.images) {
            return (
              <Link to={"/images?src=" + post.images.standard_resolution.url}>
                <motion.img
                  variants={imageVariants}
                  src={post.images.standard_resolution.url}
                  alt={post.caption}
                />
              </Link>
            );
          }
          return null;
        })()}
      </motion.div>
    </AnimatePresence>
  );
}

export default GridItem;
// export default InstaGrid;
