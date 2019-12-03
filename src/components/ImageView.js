import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { PostItem } from './PostItem';

// TODO: media queries for display controls
// TODO: fix button centering (use visibility?)
// TODO: or just copy how instagram do it...
// Modal + space-between
// TODO: change this to modal
const StyledImageView = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    margin-top: 3em;
  }
  .hidden {
    visibility: hidden !important;
  }
  .controls {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    padding-bottom: 1em;
    bottom: 0;
    /* 
    media query, large screens:
    
    */
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 1.5em;
    width: 1em;
    /* border: 1px solid #ccc; */
    color: #fff;
    a,
    a:link,
<<<<<<< Updated upstream:src/components/ImageView.js
    a:visited {
      color: #ccc;
      text-decoration: none;
=======
    a:visited,
    a:active,
    a:focus {
      color: #555;
      /* opacity: 1; */
      text-decoration: none;
      transition: opacity 0.5s ease-out;
    }

    a:hover {
      /* opacity: 1; */
      /* color: #333; */
      /* background: #eee; */
>>>>>>> Stashed changes:src/components/PostView.js
    }
  }
`;

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
      ...transition,
      delay: 0.2,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transition,
      duration: 1,
    },
  },
};

export function ImageView({ posts }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const postIndex = posts.findIndex(p => p.id === id);

  let next = null;
  let prev = null;

  if (posts[postIndex + 1] !== null) {
    next = posts[postIndex + 1];
  }

  if (posts[postIndex - 1] !== null) {
    prev = posts[postIndex - 1];
  }

  return (
    <StyledImageView
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      className="post-item"
    >
      <div className="controls">
        {prev ? (
          <div className="control">
            <Link to={`/images/${prev.id}`}>←</Link>
          </div>
        ) : (
          <div className="control hidden">←</div>
        )}
        {next && (
          // <div className={`control ${!next && 'hidden'}`}>
          <div className="control">
            <Link to={`/images/${next.id}`}>→</Link>
          </div>
        )}
      </div>
      {post && <PostItem post={post} />}
    </StyledImageView>
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
