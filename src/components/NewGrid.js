import React, { memo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { FiInstagram } from 'react-icons/fi';
import { motion, useMotionValue } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Loading } from './Loading';
import { Image } from './Image';

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
    border-radius: 10px;
    margin: 0 auto;
  }
  .open .post-content {
    background: none;
    max-width: 640px;
    height: auto;
    margin-top: 6vw;
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
    padding: 10px 10px;
    line-height: 1.5em;
    font-family: 'Open Sans', sans-serif;
    color: #032d4d;
    font-weight: 400;
    background: #fff;
    display: none;
    font-weight: 500;
    opacity: 0;
    p {
      margin: 0;
      padding: 0;
      max-width: 90%;
      margin: 0 auto;
    }
    @media only screen and (max-width: 700px) {
      font-size: 0.8em;
    }
    @media only screen and (max-width: 500px) {
      font-size: 0.9em;
    }
  }
  .caption-container .open {
    display: block;
  }
  .caption-container a {
    z-index: 2000 !important;
    position: relative;
    font-size: 1em;
    opacity: 0.7;
    /* allows us to click through overlay to actually use link */
    pointer-events: auto;
    display: block;
  }

  .links {
    a,
    a:link {
      font-size: 0.8em;
      bottom: 0;
      margin-right: 0.8rem;
      margin-bottom: 0.45rem;
      right: 0;
      color: #ccc;
      text-align: right;
      position: absolute;
      transition: color 0.2s ease-out;
      @media only screen and (min-width: 1000px) {
        /* I think this is only scoped to this element? */
        font-size: 1em;
        margin-right: 1rem;
      }
    }
    a:hover {
      color: hsla(205.9, 85.3%, 40%, 1);
    }
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

async function getPosts() {
  let res;

  try {
    res = await axios('/.netlify/functions/posts-read-latest');
    // throw new Error({ code: 500, msg: 'Couldnt fetch posts' });
  } catch (err) {
    throw new Error('Couldnt fetch posts');
  }
  return res.data.data.posts;
}

export function NewGrid({ match, history }) {
  // implement reducer rather than multiple set states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // https://www.leighhalliday.com/use-effect-hook

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsError(false);
    // setError({ code: undefined, msg: undefined });
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setIsError(true);
        console.log('Error');
        // setError({ code: 500, msg: 'Error fetching posts!' });
      }
    };

    fetchData();
    setIsLoading(false);
  }, [posts]);

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
      <motion.div className="grid">
        {/* {isError && 'Error!'} */}
        {/* {posts.length === 0 && !isError ? (
          <Loading />
        ) : ( */}
        {posts.length !== 0 &&
          posts.map((post, i) => (
            <Post
              post={post}
              isSelected={match.params.id === post.id}
              history={history}
              width={post.width}
              match={match}
              index={i}
              key={post.id}
              // variants={item}
            />
          ))}
        {/* )} */}
      </motion.div>
    </StyledGrid>
  );
}

const variants = {
  visible: i => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
    },
  }),
  hidden: { opacity: 0 },
};

const Post = memo(
  ({ isSelected, post, history, index }) => {
    const [fromGrid, setFromGrid] = useState(false);
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
      const scrollToRef = ref =>
        window.scrollTo({
          top: ref.current.offsetTop - ref.current.offsetHeight,
          behaviour: 'smooth',
        });
      if (isSelected && !fromGrid) {
        scrollToRef(containerRef);
      }
    }, [fromGrid, isSelected]);

    return (
      <motion.div
        className="post"
        key={`asd-${post.id}`}
        variants={variants}
        animate="visible"
        initial="hidden"
        custom={`${isSelected ? 0 : index}`}
        ref={containerRef}
      >
        <Overlay isSelected={isSelected} />
        <div className={`post-content-container ${isSelected && 'open'}`}>
          <motion.div
            ref={postRef}
            // without layout transition, zIndex doesn't update
            layoutTransition={isSelected ? closeSpring : openSpring}
            style={{ zIndex }}
            className="post-content"
            onUpdate={checkZIndex}
          >
            <Image
              id={post.id}
              isSelected={isSelected}
              src={post.src}
              caption={post.caption}
              width={post.width}
              height={post.height}
            />
            <Caption caption={post.caption} isSelected={isSelected} id={post.id} link={post.link} />
          </motion.div>
        </div>

        {!isSelected && (
          <Link
            to={{
              pathname: `posts/${post.id}`,
            }}
            className="post-open-link"
            onClick={() => setFromGrid(true)}
          />
        )}
      </motion.div>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected,
);

function Caption({ isSelected, caption, link }) {
  const opacity = isSelected ? 1 : 1;
  const display = isSelected ? 'block' : 'none';

  return (
    <motion.div
      className={`caption-container ${isSelected && 'open'}`}
      animate={{ opacity, display }}
      transition={isSelected ? openSpring : closeSpring}
      style={{
        zIndex: `${isSelected ? 1 : -1}`,
      }}
    >
      <p>{caption}</p>
      <div className="links">
        <a href={link}>
          <FiInstagram />
        </a>
      </div>
    </motion.div>
  );
}

function Overlay({ isSelected }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.4, delay: isSelected ? 0 : 0.4 }}
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
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
