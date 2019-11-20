import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { GridItem } from '../components/GridItem';

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      delay: 0.1,
    },
  },
  enter: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 1,
    scale: 0.5,
    zIndex: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 1,
      when: 'beforeChildren',
    },
  },
};

export function InstaGrid({ posts, loaded }) {
  return (
    <motion.div
      variants={list}
      key="list"
      initial="hidden"
      animate={loaded ? 'visible' : 'enter'}
      exit="exit"
      className="image-grid"
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        {!!posts && posts.map(post => <GridItem post={post} key={post.id} variants={list} />)}
      </AnimatePresence>
    </motion.div>
  );
}

InstaGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default InstaGrid;
