import React, { memo, useEffect, useState, useRef } from 'react';
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
// - [ ] fix image sizing finally...
// - [ ] disable scrolling when isSelected
// - [ ] fix grid flashing
// - [ ] adjust overlay timing, since grid post animation isn't a static time
//       because it varies based on distance
// - [ ] looks weird going behind header (zindex)
// - [ ] remove unused CSS
// = [ ] do components need to use react memo?
// - [ ] fix about
// - [ ] if we visit grid item directly, it fucks up zIndex aft
const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  .post {
    position: relative;
    /* padding: 25px; */
    height: 400px;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .post-content {
    pointer-events: auto;
    position: relative;
    /* background: #fff; */
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .open .post-content {
    height: auto;
    /* if height isn't auto, can't click anywhere outside to return to grid */
    max-height: 80vh;
    max-width: 450px;
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
    /* top: 15vh; */
    top: 0vh;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    overflow: hidden;
  }
  .post-open-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .post-image-container {
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    /* height: 420px;
    width: 100vw; */
    transform: translateZ(0);
  }

  .post-image {
    width: auto;

    /* background-size: cover;
    background-repeat: no-repeat; */
    /* object-fit: cover; */
    /* width: auto;
    height: auto;
    max-height: 70vh;
    overflow: hidden; */
    /* position: relative; */
    /* background-repeat: no-repeat; */

    /* width: 100vw;
    height: 50vh;
    @media (min-width: 768px) {
      width: 25vw;
      height: 25vh;
    } */
  }

  .post-image.open {
    width: 100%;
    /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.01); */

    /* margin: 0px auto; */
    /* width: 90vw; */

    /* width: 100vw;
    height: 50vh;
    @media (min-width: 768px) {
      width: 50vw;
      height: 50vh;
    } */
    /* @media (min-width: 768px) {
      width: 25vw;
      height: 25vh;
    } */
    /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1); */
    /* height: auto; */
    /* max-height: 70vh; */
    /* position: relative; */
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    /* height: 600px; */
    /* background: #ff0000; */
    /* width: auto; */
  }

  .overlay {
    z-index: 1;
    position: fixed;
    /* background: rgba(255, 255, 255, 0.95); */
    background: rgba(0, 0, 0, 0.8);
    will-change: opacity;
    top: 0;
    bottom: 0;
    /* using the code below ensures overlay is always centered
    no matter which post we click on */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* max-width: 990px; */
    /* max-width: 990px; */
  }

  .overlay a {
    display: block;
    position: fixed;
    /* top: 50vh; */
    bottom: 0;
    width: 100vw;
    height: 100vh;
    left: 50%;

    transform: translateX(-50%);
  }

  .caption-container {
    position: relative;
    bottom: 0vh;
    /* left: 30vh; */
    left: 0;
    z-index: 0;
    text-align: left;
    font-size: 0.5rem;
    padding: 10px 20px;
    box-sizing: border-box;
    /* margin: 0 auto; */
    color: #121212;
    /* width: 100%; */
    background: #fff;
    /* width: 100%; */
    opacity: 0;
    h2 {
      /* max-width: 90%; */
    }
    /* max-width: 300px; */
  }

  @media only screen and (max-width: 1200px) {
    .post {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .post:nth-child(4n + 1),
    .post:nth-child(4n + 4) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  @media only screen and (max-width: 800px) {
    .post {
      flex: 1 0 100%;
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    .post:nth-child(4n + 1),
    .post:nth-child(4n + 4) {
      flex: 1 0 100%;
      max-width: 100%;
    }

    .post-content-container.open {
      padding: 0;
    }
  }
`;

const openSpring = { type: 'spring', stiffness: 500, damping: 200 };
const closeSpring = { type: 'spring', stiffness: 1000, damping: 200 };
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
    <StyledGrid>
      {/* Animate presence only if grid hasn't loaded yet */}
      {!!posts &&
        posts.map(post => (
          <Post
            post={post}
            key={post.id}
            isSelected={match.params.id === post.id}
            history={history}
            width={post.width}
            height={post.height}
          />
        ))}
    </StyledGrid>
  );
}

const Post = memo(
  ({ isSelected, history, post }) => {
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    // const inverted = useInvertedScale();f

    const postRef = useRef(null);
    const containerRef = useRef(null);
    function checkZIndex(latest) {
      console.log('onUpdate fired');
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected) {
        zIndex.set(0);
      }
    }
    return (
      <div className="post" ref={containerRef}>
        <Overlay isSelected={isSelected} />
        <div className={`post-content-container ${isSelected && 'open'}`}>
          <motion.div
            // without layout transition, zIndex doesn't update
            layoutTransition={isSelected ? closeSpring : openSpring}
            style={{ y, zIndex }}
            ref={postRef}
            className="post-content"
            onUpdate={checkZIndex}
          >
            <Image
              id={post.id}
              isSelected={isSelected}
              src={post.src}
              width={post.width}
              height={post.height}
            />
            <Caption caption={post.caption} isSelected={isSelected} id={post.id} />
          </motion.div>
        </div>

        {/* <ContentPlaceholder /> */}
        {!isSelected && <Link to={`posts/${post.id}`} className="post-open-link" />}
      </div>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected,
);

function Image({ isSelected, id, src }) {
  const inverted = useInvertedScale();

  return (
    <motion.div
      className="post-image-container"
      style={{ ...inverted, originX: 0.5, originY: 0.5 }}
      // layoutTransition={{ closeSpring }}
      // transition={closeSpring}
    >
      {/* <motion.div
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        style={{ backgroundImage: `url(${src})`, width, backgroundSize: 'cover' }}
        alt=""
        initial={false}
        transition={closeSpring}
        animate={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
      /> */}
      <motion.img
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        src={src}
        // animate={{ opacity }}
        // style={{ backgroundImage: `url(${src})`, width, backgroundSize: 'cover' }}
        alt=""
        initial={false}
        transition={closeSpring}
        animate={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
      />
    </motion.div>
  );
}

const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

function Caption({ isSelected, id, caption }) {
  const inverted = useInvertedScale();
  const x = isSelected ? 0 : 0;
  const opacity = isSelected ? 1 : 0;
  const y = isSelected ? 0 : 0;

  return (
    <motion.div
      className="caption-container"
      // initial={true}
      animate={{ x, y, opacity }}
      // transition={isSelected ? openSpring : closeSpring}
      transition={{ type: 'tween' }}
      transformTemplate={scaleTranslate}
      style={{
        ...inverted,
        originX: 0,
        originY: 0,
        zIndex: `${isSelected ? 1 : 1}`,
        // background: `${isSelected ? '#121212' : 'transparent'}`,
        // visibility: `${isSelected ? 'visible' : 'hidden'}`,
      }}
    >
      {/* <span className="category">{caption}</span> */}
      <h2>{caption}</h2>
    </motion.div>
  );
}

function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2, delay: isSelected ? 0 : 0 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    >
      <Link to="/" />
    </motion.div>
  );
}

const ContentPlaceholder = React.memo(() => {
  const inverted = useInvertedScale();
  return (
    <motion.div className="content-container" style={{ ...inverted, originY: 0, originX: 0 }}>
      {/* <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} /> */}
      {/* <p>Image</p> */}
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
