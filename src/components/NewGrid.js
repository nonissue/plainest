import React, { memo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { motion, useInvertedScale, useMotionValue } from 'framer-motion';

// Issues:
// - [x] Image doesn't move back properly (exit animation starts inside original container)
// - [x] weird flash when closing (I think related to overlay ++ zIndex)
// - [ ] handle data fetching here or in App? Can't think of a way to render error component from here
// - [ ] full res insta images https://stackoverflow.com/questions/31302811/1080x1080-photos-via-instagram-api
//    - see instagramapiresponse.json
// = [ ] scroll restoration?
// - [ ] implement loading
// - [ ] add next/prev
// - [ ] add view on insta link
// - [x] center images vertically
// - [c] set point of interest
// - [x] images on close are obscured by other grid images, will fix
// - [x] fix image sizing finally...
// - [x] disable scrolling when isSelected
// - [x] fix grid flashing
// - [c] adjust overlay timing, since grid post animation isn't a static time
//       because it varies based on distance
// - [x] looks weird going behind header (zindex)
// - [x] remove unused CSS
// = [ ] do components need to use react memo?
// - [x] fix about
// - [x] if we visit grid item directly, it fucks up zIndex aft
const StyledGrid = styled.div`
  max-width: 990px;
  flex: 1 1 100%;
  margin: 0 auto;
  .grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .post {
    position: relative;
    padding: 25px;
    padding-left: 0;
    padding-bottom: 0;
    box-sizing: border-box;
    flex: 0 0 40%;
    max-width: 40%;
    height: 150px;
  }
  .post:nth-child(4n + 1),
  .post:nth-child(4n + 4) {
    flex: 0 0 60%;
    max-width: 60%;
  }
  .post:nth-child(4n + 1),
  .post:nth-child(4n + 4) {
    flex: 0 0 60%;
    max-width: 60%;
  }
  .post:nth-child(odd) {
    padding-left: 0;
  }

  .post:nth-child(even) {
    padding-right: 0;
  }
  .post-content {
    position: relative;
    overflow: hidden;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    height: 100%;
    border-radius: 20px;
    margin: 0 auto;
  }
  .open .post-content {
    max-width: 640px;
    height: auto;
    margin-top: 25px;
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
    width: 100%;
    overflow: hidden;
    transform: translateZ(0);
  }
  .post-image-container img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .post-image.open {
    width: 100%;
  }
  .overlay {
    z-index: 1;
    position: fixed;
    background: rgba(255, 255, 255, 0.94);
    will-change: opacity;
    top: 0;
    bottom: 0;
    /* using the code below ensures overlay is always centered
    no matter which post we click on */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
  .overlay a {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    left: 50%;
    transform: translateX(-50%);
  }
  .caption-container {
    padding: 20px 20px;
    line-height: 1.5em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    color: #121212;
    background: #fff;
    display: none;
    font-weight: 500;
    opacity: 0;
    p {
      margin: 0;
      padding: 0;
    }
  }

  .caption-container .open {
    display: block;
  }

  @media only screen and (max-width: 3000px) {
    .post {
      height: 250px;
    }
  }

  @media only screen and (max-width: 1200px) {
    .post {
      flex: 0 0 50%;
      max-width: 50%;
      height: 250px;
      padding-left: 0;
    }

    .post:nth-child(4n + 1),
    .post:nth-child(4n + 4) {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .grid {
      padding: 25px;
    }
  }

  @media only screen and (max-width: 750px) {
    .open .post-content {
      max-width: 90vw;
    }
    padding: 0 25px;
    .post {
      flex: 1 0 100%;
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
      height: 225px;
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

  @media only screen and (max-width: 400px) {
    .open .post-content {
      max-width: 90vw;
    }
    .open .post-content {
      max-width: 90vw;
    }
    padding: 0 25px;
    .post {
      flex: 1 0 100%;
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
      height: 150px;
    }

    .post:nth-child(4n + 1),
    .post:nth-child(4n + 4) {
      flex: 1 0 100%;
      max-width: 100%;
    }

    .post-content-container.open {
      padding: 0;
    }

    .grid {
      padding: 0;
    }
  }
`;

const openSpring = { type: 'spring', stiffness: 300, damping: 200 };
const closeSpring = { type: 'spring', stiffness: 300, damping: 200 };

export function NewGrid({ match, history }) {
  const [posts, setPosts] = useState([]);
  const [postHeight, setPostHeight] = useState(null);

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
      setPostHeight(Math.min(...fetchedPosts.map(post => post.height)));

      if (fetchedPosts.find(p => p.id === match.params.id)) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    try {
      fetchData();
    } catch (err) {
      console.log('Error occurred: ');
      console.log(err);
    }
  }, [match.params.id]);

  return (
    <StyledGrid>
      <div className="grid">
        {!!posts &&
          !!postHeight &&
          posts.map(post => (
            <Post
              post={post}
              key={post.id}
              isSelected={match.params.id === post.id}
              history={history}
              width={post.width}
              maxHeight={postHeight}
            />
          ))}
      </div>
    </StyledGrid>
  );
}

const Post = memo(
  ({ isSelected, post, maxHeight }) => {
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    const postRef = useRef(null);
    const containerRef = useRef(null);

    function checkZIndex() {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected) {
        zIndex.set(0);
      }
    }

    return (
      <div className="post" style={{ maxHeight }} ref={containerRef}>
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
      style={{ ...inverted, originX: 0.2, originY: -0.3 }}
    >
      <motion.img
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        src={src}
        alt=""
        initial={false}
        transition={closeSpring}
        animate={isSelected ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        style={{
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </motion.div>
  );
}

function Caption({ isSelected, caption }) {
  const inverted = useInvertedScale();
  const x = isSelected ? 0 : 0;
  const opacity = isSelected ? 1 : 0;
  const y = isSelected ? 0 : 200;
  const display = isSelected ? 'block' : 'none';

  return (
    <motion.div
      className={`caption-container ${isSelected && 'open'}`}
      animate={{ x, y, opacity, display }}
      transition={isSelected ? openSpring : closeSpring}
      style={{
        ...inverted,
        originX: 0,
        originY: 0,
        zIndex: `${isSelected ? 1 : -1}`,
      }}
    >
      <p>{caption}</p>
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
      <Link to="/posts" />
    </motion.div>
  );
}

NewGrid.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

Caption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
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
  maxHeight: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
