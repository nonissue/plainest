/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ToggleModal } from './PostModal';
import { useHistory, Link, useLocation } from 'react-router-dom';

const GridItemWrapper = styled.div`
  overflow: hidden;
  z-index: 1;

  .post-modal {
    font-family: 'Work Sans', 'Arial', sans-serif;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    width: 100%;
    /* max-width: vh; */
    z-index: 9999;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: hsla(0, 0%, 80%, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      max-width: 100vw;
      height: auto;
      max-height: 70vh;
    }
  }
  img {
    z-index: 1000;
  }
`;

const transition = {
  type: 'inertia',
  duration: 1,
};

const imageVariants = {
  hover: { scale: 1 },
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
      duration: 0.1,
    },
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
      // when: 'afterChildren',
      duration: 0,
    },
    opacity: 0,
  },
};

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook
export function GridItem({ post }) {
  let location = useLocation();

  console.log('griditem location');
  console.log(location);

  return (
    <GridItemWrapper>
      <motion.div initial="hidden" enter="enter" exit="hidden" variants={item}>
        {post.images && (
          <motion.div whileHover="hover" variants={frameVariants} key={post.id}>
            {/* onClick={() => toggleModal(true)} */}
            {/* <Link to={`/images/${post.id}`}> */}
            {/* <buttTogglon type="button" onClick={show}> */}
            <ToggleModal
              toggle={show => (
                <Link
                  to={{
                    pathname: `/images/${post.id}`,
                    state: { background: location },
                  }}
                  onClick={show}
                  // onKeyDown={show}
                >
                  <img
                    alt={post.caption}
                    key={post.id}
                    src={post.src}
                    width={post.width}
                    style={{ zIndex: 0 }}
                  />
                  Show
                </Link>
              )}
              content={hide => (
                <button type="button" className="post-modal" onClick={hide} onKeyDown={hide}>
                  Hide
                  <img
                    // whileHover="hover"
                    // variants={imageVariants}
                    alt={post.caption}
                    key={post.id}
                    src={post.src}
                    // transition={{ type: 'tween', stiffness: 0 }}
                    width={post.width}
                  />
                  <p>{post.caption}</p>
                  {/* <button onClick={hide}>Close</button> */}
                </button>
              )}
            />
            {/* </Link> */}
          </motion.div>
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
