import React from 'react';
import PropTypes from 'prop-types';
// import { useParams, Link, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// import { LeftCircle, RightCircle, Home } from '@ant-design/icons';

import { PostItem } from './PostItem';

// TODO: media queries for display controls
// TODO: fix button centering (use visibility?)
// TODO: or just copy how instagram do it...
// Modal + space-between
// TODO: change this to modal
const StyledSinglePostView = styled(motion.div)`
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
      delay: 0,
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

export function SinglePostView({ posts, match, history }) {
  console.log(match);
  console.log(history);

  return (
    <StyledSinglePostView
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      className="post-item"
    >
      {posts.map(post => (
        <PostItem
          key={post.id}
          isSelected={match.params.id === post.id}
          history={history}
          post={post}
        />
      ))}
    </StyledSinglePostView>
  );
}

SinglePostView.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default SinglePostView;
