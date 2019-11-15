import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const item = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  hidden: {
    opacity: 0,
    x: 0,
    transition: {
      when: "afterChildren"
    }
  }
};

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <AnimatePresence>
      <motion.div
        key={post.id * 3}
        initial="hidden"
        // enter={{ opacity: 1 }}
        enter="visible"
        exit="hidden"
        // exit={{ opacity: 0 }}
        // exit="hidden"
        // exit="hidden"
        variants={item}
      >
        {(() => {
          if (post.images) {
            // if (post) {
            return (
              <Link to={"/images?src=" + post.images.standard_resolution.url}>
                {/* <Link to={"/images?src=" + post.src}> */}
                {/* <AnimatePresence> */}
                <motion.img
                  // key={post.src}
                  // src={post.src}
                  key={post.images.standard_resolution.url}
                  src={post.images.standard_resolution.url}
                  // initial={{ opacity: 0, y: 100 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: 200 }}
                />
                {/* </AnimatePresence> */}
                {/* <img
                // key={post.id}
                // variants={imageVariants}
                src={post.images.standard_resolution.url}
                alt={post.caption}
              /> */}
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
