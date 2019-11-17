import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: {
    opacity: 0
  },
  hidden: shown => ({
    opacity: 0
  }),
  center: {
    opacity: 1,
    transition: {
      delay: 0.1,
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

function PostItem({ post }) {
  return (
    <>
      {console.log(post)}
      <a href={post.link}>
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
