import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GridItem } from './GridItem';

// change below into css grid, rather than using css columns
const StyledGrid = styled(motion.div)`
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

  .post {
    pointer-events: auto;
    position: relative;
    border-radius: 20px;
    background: #1c1c1e;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .post-content-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    pointer-events: none;
  }
  .post-content-container.open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 2;
    overflow: hidden;
    padding: 40px 0;
  }
  .post-open-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .post.img {
    width: 100%;
    height: 100%;
  }

  .overlay {
    z-index: 2;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    will-change: opacity;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* max-width: 990px; */
  }

  .overlay a {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw;
    left: 0;

    transform: translateX(-50%);
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

export function NewGrid({ match, history }) {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
    };

    try {
      fetchData();
      // setLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error occurred: ');
      // eslint-disable-next-line no-console
      console.log(err);
      //   setError({ status: err.status, msg: err.message });
    }

    // setLoaded(false);
  }, []);

  return (
    <StyledGrid variants={list}>
      {/* Animate presence only if grid hasn't loaded yet */}
      {!!posts &&
        posts.map(post => (
          <Post
            post={post}
            key={post.id}
            isSelected={match.params.id === post.id}
            history={history}
          />
        ))}
    </StyledGrid>
  );
}

function Post({ isSelected, history, post }) {
  return (
    <div className="post">
      <Overlay isSelected={isSelected} />
      <div className={`post-content-container ${isSelected && 'open'}`}>
        <Image id={post.id} isSelected={isSelected} src={post.src} />
      </div>
      {!isSelected && <Link to={`posts/${post.id}`} className={`post-open-link`} />}
    </div>
  );
}

function Image({ isSelected, id, src }) {
  return (
    <motion.img
      className="card-image"
      src={`${src}`}
      alt=""
      initial={false}
      animate={isSelected ? { x: -20, y: -20 } : { x: 0, y: 0 }}
    />
  );
}

function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    >
      <Link to="/" />
    </motion.div>
  );
}

NewGrid.propTypes = {
  //   posts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.string.isRequired,
  //       caption: PropTypes.string.isRequired,
  //       link: PropTypes.string.isRequired,
  //       images: PropTypes.object.isRequired,
  //       width: PropTypes.number.isRequired,
  //       height: PropTypes.number.isRequired,
  //       src: PropTypes.string.isRequired,
  //     }),
  //   ).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
