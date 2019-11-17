import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: shown => ({
    opacity: 0
    // x: shown ? -400 : 400,
    // y: shown ? -400 : 400
  }),
  hidden: shown => ({
    opacity: 0,
    x: 50
    // y: shown ? -10 : 10
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      // duration: 2,
      duration: 0.2
      // ...transition
    }
  },
  exit: {
    // scale: 0.7,
    opacity: 0,
    x: 50,
    transition: {
      // when: "afterChildren",
      // staggerChildren: 0.4,
      duration: 0.3
      // ...transition
    }
  }
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
  // const [shown, setShown] = useState(false);
  // const [img, setImg] = useState(null);
  const [post, setPost] = useState(null);

  // let query = useQuery();
  // let postID = query.get("id");
  let { id } = useParams();
  const postID = id;
  console.log("postID" + postID);

  useEffect(() => {
    setPost(posts.find(post => post.id === postID));
  }, [posts, postID]);

  // let src = query.get("src");

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      transition={{ duration: 1 }}
      className="post-item"
    >
      {post ? <PostItem post={post} /> : ""}
    </motion.div>
  );
}

export default ImageView;
