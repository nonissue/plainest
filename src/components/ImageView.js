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
  justify-content: center;
  @media (min-width: 768px) {
    margin-top: 3em;
  }
  .hidden {
    visibility: hidden !important;
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* margin: 2em; */
    font-size: 1.5em;
    width: 2em;
    border: 1px solid #ccc;
    color: #fff;
    a,
    a:link,
    a:visited {
      text-decoration: none;
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
      // transition={{ duration: 2 }}
      className="post-item"
    >
      {prev && (
        <div className="control">
          <Link to={`/images/${prev.id}`}>←</Link>}
        </div>
      )}
      {/* <PostItem post={post} /> */}
      {/* dont think below is necessary as app.js already shows loading */}
      {post && <PostItem post={post} />}
      {/* <div className={`control ${!next && 'hidden'}`}> */}
      <div className={`control ${!next && 'hidden'}`}>
        {next && <Link to={`/images/${next.id}`}>→</Link>}
      </div>
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
