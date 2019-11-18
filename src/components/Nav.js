import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const location = useLocation();

  return (
    <div className="nav">
      {/* <div>
        <Link to="/">Home</Link>
      </div> */}
      {location.pathname === "/" ? (
        ""
      ) : (
        <AnimatePresence>
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
            exit={{ opacity: 0.5, scale: 2, transition: { duration: 5 } }}
            className="nav-left"
          >
            <Link to="/">{"<"}</Link>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="nav-right">
        <Link to="/about" alt="about page">
          ?
        </Link>
      </div>
    </div>
  );
}
