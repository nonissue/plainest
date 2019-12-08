import React, { useEffect } from 'react';
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

  .new-grid {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-auto-rows: 50vh;
    @media (min-width: 768px) {
      grid-auto-rows: 40vh;
    }
    border: 1px solid transparent;
    border-top: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    overflow: hidden;
  }

  .image-grid > div {
    width: 100%;
    overflow: hidden;
  }

  .image-grid img {
    width: 100%;
    overflow: hidden;
    display: block;
    /* z-index: 1; */
    /* object-fit: cover; */
  }
`;

// Controls individual items as they load on grid
// Exit currently doesn't work
const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  enter: {
    opacity: 0,
  },
  hidden: {
    opacity: 0,
    zIndex: 0,
  },
  exit: {
    opacity: 0,
    // scale: 0,
    zIndex: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Grid({ posts, setLoaded, loaded }) {
  useEffect(() => {
    // have to add delay in order for grid to render initially
    // probably a better way to do this with useEffect
    // Update: Got it!
    setLoaded(true);
  }, [setLoaded, posts]);

  return (
    <StyledGrid>
      <motion.div
        variants={list}
        key="list"
        initial={false}
        animate="visible" // this has to be here?
        exit="exit"
        className="new-grid"
      >
        {/* Animate presence only if grid hasn't loaded yet */}
        <AnimatePresence initial={!loaded}>
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
  setLoaded: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default Grid;
