import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GridItem } from '../components/GridItem';

const InstaGridWrapper = styled.div`
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
    padding-top: 0em;
  }

  .image-grid img {
    width: 100%;
    overflow: hidden;
    display: block;
    object-fit: cover;
  }

  .frame {
    overflow: hidden;
  }

  .image-view {
    overflow: hidden;
  }
`;

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
    opacity: 0,
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
    <InstaGridWrapper>
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
    </InstaGridWrapper>
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
