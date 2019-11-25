import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { PostItem } from './PostItem';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  enter: {
    opacity: 0,
  },
  hidden: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      delay: 0.2,
      ...transition,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

export function ImageView({ posts }) {
  const { id } = useParams();
  // this is probably bad?
  const post = posts.find(p => p.id === id);
  // const post = posts ? posts.find(p => p.id === id) : null;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      // transition={{ duration: 2 }}
      className="post-item"
    >
      {/* <PostItem post={post} /> */}
      {/* dont think below is necessary as app.js already shows loading */}
      {post ? <PostItem post={post} /> : ''}
    </motion.div>
  );
}

ImageView.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default ImageView;
