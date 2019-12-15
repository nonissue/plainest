import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { FiInstagram } from 'react-icons/fi';
import { motion, useInvertedScale, useMotionValue } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Loading } from './Loading';

// Separate into individual components
const StyledGrid = styled.div`
  /* media queries located at bottom of StyledGrid */
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
    background: #eee;
    position: relative;
    overflow: hidden;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    height: 100%;
    border-radius: 20px;
    margin: 0 auto;
  }
  .open .post-content {
    background: none;
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
    height: 100%;
    overflow: hidden;
    transform: translateZ(0);
    object-fit: none;
    object-position: center center;
  }
  .post-image-container img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* object-fit: cover; */
    /* object-fit: none;
    object-position: 50% 50%; */
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
  .caption-container a {
    z-index: 2000 !important;
    position: relative;
    font-size: 1em;
    padding-top: 1em;
    opacity: 0.7;
    color: #121212;
    /* allows us to click through overlay to actually use link */
    pointer-events: auto;
    display: block;
  }

  /* media queries */
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

export function NewGrid({ posts, match, history }) {
  const [loading, setLoading] = useState(true);

  // https://www.leighhalliday.com/use-effect-hook

  useEffect(() => {
    if (posts.length !== 0) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [posts]);

  // disable scroll on modal shown
  useEffect(() => {
    // body-scroll-lock package handles locking scroll for us
    // should look into accessbility concerns of this
    const body = document.querySelector('body');
    if (posts.find(p => p.id === match.params.id)) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [match, posts]);

  return (
    <StyledGrid>
      <div className="grid">
        {loading ? (
          <Loading />
        ) : (
          !!posts &&
          posts.map(post => (
            <Post
              post={post}
              key={post.id}
              isSelected={match.params.id === post.id}
              history={history}
              width={post.width}
              match={match}
            />
          ))
        )}
      </div>
    </StyledGrid>
  );
}

const Post = memo(
  ({ isSelected, post, maxHeight, history }) => {
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

    // dismiss modal when escape is pressed
    useEffect(() => {
      const dismissModal = event => {
        if (isSelected && event.key === 'Escape') {
          history.push('/');
        }
      };

      window.addEventListener('keydown', dismissModal);

      return () => {
        window.removeEventListener('keydown', dismissModal);
      };
    }, [isSelected, history]);

    // when modal is dismissed, make sure scroll pos is in sync
    // when visiting an item near end of list directly, when modal dismissed
    // scroll pos was top of list
    useEffect(() => {
      const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
      if (isSelected) {
        scrollToRef(containerRef);
      }
    }, [isSelected]);

    return (
      <div className="post" style={{ maxHeight }} ref={containerRef}>
        <Overlay isSelected={isSelected} />
        <div className={`post-content-container ${isSelected && 'open'}`}>
          <motion.div
            ref={postRef}
            // without layout transition, zIndex doesn't update
            layoutTransition={isSelected ? closeSpring : openSpring}
            style={{ y, zIndex }}
            className="post-content"
            onUpdate={checkZIndex}
            drag={isSelected && false}
          >
            <Image
              id={post.id}
              isSelected={isSelected}
              src={post.src}
              width={post.width}
              height={post.height}
            />
            <Caption caption={post.caption} isSelected={isSelected} id={post.id} link={post.link} />
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
          display: 'block',
        }}
      />
    </motion.div>
  );
}

function Caption({ isSelected, caption, link }) {
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
      <p>
        <a href={link}>
          <FiInstagram />
        </a>
      </p>
    </motion.div>
  );
}

function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2, delay: isSelected ? 0.2 : 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className="overlay"
    >
      <Link to="/" />
    </motion.div>
  );
}

const PostPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
});

NewGrid.propTypes = {
  posts: PropTypes.arrayOf(PostPropTypes).isRequired,
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
  link: PropTypes.string.isRequired,
};

Post.propTypes = {
  post: PostPropTypes.isRequired,
  // maxHeight: PropTypes.number.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
