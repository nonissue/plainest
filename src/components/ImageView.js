import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { PostItem } from "./PostItem";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: {
    opacity: 0
  },
  hidden: {
    opacity: 0
  },
  center: {
    opacity: 1,
    transition: {
      ...transition
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export function ImageView({ posts }) {
  let { id } = useParams();

  const post = posts.find(post => post.id === id);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="center"
      // exit="exit"
      transition={{ duration: 1 }}
      className="post-item"
    >
      {post ? <PostItem post={post} /> : "Loading"}
    </motion.div>
  );
}

export default ImageView;
