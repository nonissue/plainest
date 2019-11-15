import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const variants = {
  enter: shown => ({
    x: shown ? -500 : 500,
    opacity: 0,
    zIndex: 10,
    transition: { duration: 0.5 }
  }),
  hidden: {
    x: 400,
    opacity: 0
  },
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: shown => ({
    zIndex: 1,
    x: shown < 0 ? -500 : 500,
    opacity: 0,
    transition: {
      duration: 0.5
    }
  })
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ImageView({ src }) {
  // const [shown, setShown] = useState(false);

  // useEffect(() => {
  //   setShown(true);
  // }, []);

  let query = useQuery();

  return (
    <div className="image-view">
      <motion.div
        positionTransition
        variants={variants}
        initial="hidden"
        animate="center"
        exit="exit"
      >
        <img src={query.get("src")} className="image-view" alt="instagram" />
      </motion.div>
    </div>
  );
}

export default ImageView;
