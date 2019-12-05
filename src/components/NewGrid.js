import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
    <StyledGrid>
      {/* Animate presence only if grid hasn't loaded yet */}
      {!!posts &&
        posts.map(post => (
          <GridItem
            post={post}
            key={post.id}
            variants={list}
            isSelected={match.params.id === post.id}
            history={history}
          />
        ))}
    </StyledGrid>
  );
}

function Post({ isSelected, id, caption, history, src, width, height, link, images }) {
  return (
    <div>
      <Overlay isSelected={isSelected} />
      <div className={`post-content-container ${isSelected && 'open'}`}>
        <Image id={id} isSelected={isSelected} src={src} />
      </div>
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
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
