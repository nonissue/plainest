import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GridItemWrapper = styled.div`
  overflow: hidden;
`;

const transition = {
  type: 'inertia',
  duration: 1,
};

const imageVariants = {
  hover: { scale: 1.2 },
  transition,
};

const frameVariants = {
  hover: { scale: 1 },
  transition,
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
    <GridItemWrapper>
      <motion.div initial="hidden" enter="enter" exit="hidden" variants={item}>
        {post.images ? (
          <motion.div whileHover="hover" variants={frameVariants}>
            <Link to={`/images/${post.id}`}>
              <motion.img
                whileHover="hover"
                variants={imageVariants}
                alt={post.caption}
                key={post.id}
                src={post.src}
                // transition={{ transition }}
                transition={{ type: 'tween', stiffness: 20 }}
              />
            </Link>
          </motion.div>
        ) : (
          ''
        )}
      </motion.div>
    </GridItemWrapper>
  );
}

GridItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default GridItem;
