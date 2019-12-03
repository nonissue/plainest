import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GridItem } from './GridItem';

// change below into css grid, rather than using css columns
const StyledGrid = styled.div`
  .image-grid {
    column-count: 4;
    column-gap: 0em;
    column-width: 300px;
    margin: 2vh auto;
    margin-top: 0;
    padding-bottom: 4vh;
  }

  .image-grid > div {
    width: 100%;
    overflow: hidden;
  }

  .image-grid img {
    width: 100%;
    overflow: hidden;
    display: block;
    /* object-fit: cover; */
  }
`;

const list = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
      // duration: 0.5,
    },
  },
  enter: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
    zIndex: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0,
      when: 'beforeChildren',
    },
  },
};

export function Grid({ posts }) {
  return (
    <StyledGrid>
      <motion.div
        variants={list}
        key="list"
        initial="hidden"
        animate="visible" // this has to be here?
        exit="exit"
        className="image-grid"
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          {/* Remove header, put logo here */}
          {/* <div>
            <h1>Plainsite logo here</h1>
          </div> */}
          {!!posts && posts.map(post => <GridItem post={post} key={post.id} variants={list} />)}
        </AnimatePresence>
      </motion.div>
    </StyledGrid>
  );
}

Grid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
  // loaded: PropTypes.bool.isRequired,
};

export default Grid;
