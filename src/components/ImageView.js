import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: shown => ({
    opacity: 0
    // x: shown ? -400 : 400,
    // y: shown ? -400 : 400
  }),
  hidden: shown => ({
    opacity: 0
    // x: 500
    // y: shown ? -10 : 10
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      // duration: 0.2,
      ...transition
    }
  },
  exit: {
    opacity: 0,
    // x: 50,
    transition: {
      duration: 0.3
    }
  }
};

function PostItem({ post }) {
  return (
    <>
      {console.log(post)}
      <a href={post.url}>
        <img src={post.images.standard_resolution.url} alt={post.caption} />
      </a>
      <p>{post.caption}</p>
    </>
  );
}

export function ImageView({ posts }) {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const postID = id;

  useEffect(() => {
    setPost(posts.find(post => post.id === postID));
  }, [posts, postID]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="center"
      // exit="exit"
      transition={{ duration: 1 }}
      className="post-item"
    >
      {post ? <PostItem post={post} /> : ""}
    </motion.div>
  );
}

export default ImageView;
