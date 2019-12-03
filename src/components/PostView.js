import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { LeftCircle, RightCircle, Home } from '@ant-design/icons';

import { PostItem } from './PostItem';

// TODO: media queries for display controls
// TODO: fix button centering (use visibility?)
// TODO: or just copy how instagram do it...
// Modal + space-between
// TODO: change this to modal
const StyledPostView = styled(motion.div)`
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
    color: #fff;

    a,
    a:link,
    a:visited,
    a:active,
    a:focus {
      color: #555;
      opacity: 0.5;
      text-decoration: none;
      transition: opacity 0.5s ease-out;
    }

    a:hover {
      /* opacity: 1; */
      /* color: #333; */
      /* background: #eee; */

      opacity: 1;
      color: #333;
      /* background: #eee; */
    }
  }
`;

// Transitions for animations
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

// Animations
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
      delay: 0.1,
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

export function PostView({ posts }) {
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
    <StyledPostView
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      className="post-item"
    >
      <div className="controls">
        {prev ? (
          <div className="control">
            <Link to={`/images/${prev.id}`}>
              <LeftCircle />
            </Link>
          </div>
        ) : (
          <div className="control hidden">
            <LeftCircle />
          </div>
        )}
        <div className="control">
          <Link to="/">
            <Home />
          </Link>
        </div>
        {next && (
          <div className="control">
            <Link to={`/images/${next.id}`}>
              <RightCircle />
            </Link>
          </div>
        )}
      </div>
      {post && <PostItem post={post} />}
    </StyledPostView>
  );
}

PostView.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default PostView;
