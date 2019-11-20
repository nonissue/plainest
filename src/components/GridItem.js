import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const imageVariants = {
  hover: { scale: 1.1, overflow: 'hidden' },
};

// eslint-disable-next-line no-unused-vars
const frameVariants = {
  hover: { scale: 1, margin: 0 },
};

const item = {
  enter: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.5,
    },
  },
  exit: {
    transition: {
      when: 'afterChildren',
      duration: 3,
    },
    opacity: 0,
    scale: 0.5,
  },
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function GridItem({ post }) {
  return (
    <motion.div
      initial="hidden"
      enter="enter"
      exit="hidden"
      variants={item}
      style={{ overflow: 'hidden' }}
    >
      {post.images ? (
        <motion.div whileHover="hover" style={{ overflow: 'hidden' }} variants={frameVariants}>
          <Link to={`/images/${post.id}`}>
            <motion.img
              whileHover="hover"
              variants={imageVariants}
              alt={post.caption}
              key={post.id}
              src={post.images.standard_resolution.url}
            />
          </Link>
        </motion.div>
      ) : (
        ''
      )}
    </motion.div>
  );
}

// GridItem.propTypes = {
//   post: PropTypes.object.isRequired,
// };

GridItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
  }).isRequired,
};

export default GridItem;
