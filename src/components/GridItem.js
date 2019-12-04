/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GridItemWrapper = styled.div`
  overflow: hidden;
  z-index: 1;

  .grid-image {
    background-size: cover;
    /* -webkit-filter: blur(px); */
    height: 50vh;
    @media (min-width: 768px) {
      height: 40vh;
    }
  }
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
    zIndex: 0,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      // when: 'afterChildren',
      duration: 0,
    },
    opacity: 0,
  },
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function GridItem({ post }) {
  return (
    <GridItemWrapper>
      <motion.div initial="hidden" enter="enter" exit="hidden" variants={item}>
        {post.images && (
          <Link to={`/posts/${post.id}`}>
            <motion.div whileHover="hover" variants={frameVariants} key={post.id}>
              <motion.div
                whileHover="hover"
                variants={imageVariants}
                alt={post.caption}
                key={post.id}
                className="grid-image"
                style={{
                  backgroundImage: `url(${post.src})`,
                }}
                transition={{ type: 'tween', stiffness: 20 }}
              >
                {/* <img src={post.src} /> */}
              </motion.div>
            </motion.div>
          </Link>
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default GridItem;
