import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: shown => ({
    opacity: 0
    // x: shown ? -400 : 400,
    // y: shown ? -400 : 400
  }),
  hidden: shown => ({
    opacity: 0,
    x: shown ? -10 : 10
    // y: shown ? -10 : 10
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: {
      // when: "afterChildren",
      // staggerChildren: 0.4,
      duration: 1,
      ...transition
    }
  }
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ImageView() {
  const [shown, setShown] = useState(false);
  const [img, setImg] = useState(null);
  let query = useQuery();

  useEffect(() => {
    setShown(true);
    setImg(query.get("src"));
  }, [query]);

  let src = query.get("src");

  return (
    <div className="image-view">
      <motion.div
        variants={variants}
        initial="enter"
        animate="center"
        enter="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {src ? (
          <img src={query.get("src")} className="image-view" alt="instagram" />
        ) : (
          "No image found"
        )}
      </motion.div>
    </div>
  );
}

export default ImageView;
