import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { motion, useInvertedScale, useMotionValue } from 'framer-motion';

// Issues:
// - [x] Image doesn't move back properly (exit animation starts inside original container)
// - [ ] weird flash when closing (I think related to overlay ++ zIndex)
// - [ ] add next/prev
// - [ ] center images vertically
// - [ ] set point of interest
// - [ ] images on close are obscured by other grid images, will fix
const StyledGrid = styled(motion.div)`
  /* overflow: hidden; */

  display: grid;
  /* grid-gap: 5px; */
  /* padding: 10px; */
  grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
  grid-auto-rows: 30vh;

  @media (min-width: 768px) {
    grid-auto-rows: 50vh;
  }

  .post {
    position: relative;
    /* padding: 25px; */
    height: 50vh;
    /* flex: 0 0 40%; */
    /* max-width: 40%; */
  }
  .post-content {
    pointer-events: auto;
    position: relative;
    /* border-radius: 20px; */
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .open .post-content {
    /* height: auto; */
    /* max-width: 420px; */
    /* height: auto; */
    /* width: auto; */
    max-height: 50vh;
    max-width: 50vw;
    overflow: hidden;
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
    z-index: 1;
    overflow: hidden;
    /* padding: 40px 0; */
    /* border: 1px solid #333; */
  }
  .post-open-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .post-image {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    background-size: cover;
    position: relative;
    /* background-repeat: no-repeat; */
    height: 50vh;
    width: 50vw;
    /* width: 40vw; */
    /* height: 30vh; */
    /* width: auto; */
    /* height: 200px; */
    /* width: 200px; */
  }
  .post-image.openz {
    margin: 0px auto;
    width: auto;
    max-width: 50vw;
    height: 50vh;
    /* height: auto; */
    max-height: 70vh;
    /* position: relative; */
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    /* height: 600px; */
    /* background: #ff0000; */
    /* width: auto; */
  }
  /* .post-image-container.img {
    width: 100%;
    position: relative;
  } */

  .post-image-container {
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    /* height: 420px; */
    width: 100vw;
    transform: translateZ(0);
  }

  .overlay {
    z-index: 1;
    position: fixed;
    background: rgba(255, 255, 255, 0.8);
    will-change: opacity;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* max-width: 990px; */
    /* max-width: 990px; */
  }

  .overlay a {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw;
    left: 50%;

    transform: translateX(-50%);
  }

  .post-container {
    /* padding: 460px 35px 35px 35px; */
    max-width: 700px;
    width: 90vw;
  }
`;

const openSpring = { type: 'spring', stiffness: 500, damping: 100 };
const closeSpring = { type: 'spring', stiffness: 500, damping: 200 };
// const closeTween = { type: 'tween', duration: 0.5 };

export function NewGrid({ match, history }) {
  const [posts, setPosts] = useState([]);
  //   const [loaded, setLoaded] = useState(false);

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
    <StyledGrid animate={{ opacity: 1 }} style={{ opacity: 0 }} transition={{ duration: 0 }}>
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
  const y = useMotionValue(0);
  const zIndex = useMotionValue(isSelected ? 2 : 0);
  const postRef = useRef(null);
  //   const containerRef = useRef(null);
  function checkZIndex(latest) {
    if (isSelected) {
      zIndex.set(2);
    } else if (!isSelected && latest.scaleX < 1.01) {
      zIndex.set(0);
    }
  }
  return (
    <div
      className="post"
      //   ref={containerRef}
    >
      <Overlay isSelected={isSelected} />
      <div className={`post-content-container ${isSelected && 'open'}`}>
        <motion.div
          layoutTransition={isSelected ? openSpring : closeSpring}
          style={{ zIndex, y }}
          ref={postRef}
          className="post-content"
          onUpdate={checkZIndex}
        >
          <Image id={post.id} isSelected={isSelected} src={post.src} />
        </motion.div>
      </div>
      {/* <ContentPlaceholder /> */}
      {!isSelected && <Link to={`posts/${post.id}`} className="post-open-link" />}
    </div>
  );
}

function Image({ isSelected, id, src }) {
  const inverted = useInvertedScale();

  return (
    <motion.div className="post-image-container" style={{ ...inverted, originX: 0.5, originY: 0 }}>
        <motion.div
          key={`post-${id}`}
          className={`post-image ${isSelected && 'open'}`}
          style={{ backgroundImage: `url(${src})` }}
          alt=""
          initial={false}
          transition={closeSpring}
          // style={{ borderRadius: '20px' }}
          animate={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        >
        </motion.div>
    </motion.div>
  );
}

function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.5, delay: isSelected ? 0 : 0 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    >
      <Link style={{ border: '1px solid yellow' }} to="/" />
    </motion.div>
  );
}

const ContentPlaceholder = React.memo(() => {
  const inverted = useInvertedScale();
  return (
    <motion.div className="content-container" style={{ ...inverted, originY: 0, originX: 0 }}>
      {/* <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} /> */}
      <p>Image</p>
    </motion.div>
  );
});

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

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
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
