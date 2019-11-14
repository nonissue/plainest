import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96]
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ImageView({ src }) {
  let query = useQuery();

  return (
    <>
      <div className="image-view">
        <AnimatePresence>
          <motion.img
            src={query.get("src")}
            initial={{ opacity: 0, y: 10, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="image-view"
            alt="instagram"
          />
        </AnimatePresence>
      </div>
      <div className="back">
        <Link to="/">←</Link>
      </div>
    </>
  );
}

export default ImageView;
