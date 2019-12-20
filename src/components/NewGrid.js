import React, { memo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { FiInstagram } from 'react-icons/fi';
import { motion, useMotionValue } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Image } from './Image';

// december:
// readdded grid stagger
// Separate into individual components
const StyledGrid = styled.div`
  /* media queries located at bottom of StyledGrid */
  max-width: 990px;
  flex: 1 1 100%;
  margin: 0 auto;
  /* will-change: scale; */
  /* z-index: 0; */
  /* -webkit-transform: translateZ(0); */
  .grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    /* perspective: 0px; */
    /* transform: translateZ(-1000px); */
    /* transform-style: flat; */
    /* -webkit-transform: translateZ(-1000px); */
    /* will-change: scale; */
    /* transform: translateZ(0); */
  }
  .post {
    position: relative;
    padding: 25px;
    padding-left: 0;
    padding-bottom: 0;
    box-sizing: border-box;
    flex: 0 0 calc(100% / 3);
    max-width: calc(100% / 3);
    height: 100px;
  }
  .post:nth-child(4n + 1) {
    flex: 0 0 calc(100% * 2 / 3);
    max-width: calc(100% * 2 / 3);
  }
  .post:nth-child(4n + 4) {
    flex: 0 0 calc(100% * 2 / 3);
    max-width: calc(100% * 2 / 3);
  }
  /* select 1, 5, 9, 13 */
  /* .post:nth-child(4n + 1),
  .post:nth-child(4n + 4) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .post:nth-child(4n + 1),
  .post:nth-child(4n + 4) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .post:nth-child(odd) {
    padding-left: 0;
  }
  .post:nth-child(even) {
    padding-right: 0;
  } */
  .post-content {
    /* background: #eee; */
    position: relative;
    overflow: hidden;
    width: 100%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    height: 100%;
    border-radius: 5px;
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
    /* z-index: 2000 !important; */
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
      height: 200px;
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
  } catch (err) {
    throw new Error('Couldnt fetch posts');
  }
  return res.data.data.posts;
}

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const sidebarPoses = {
  open: {
    y: 0,
    // scale: 1,
    transition: {
      ...closeSpring,
      when: 'beforeChildren',
      staggerChildren: 0.5,
      // type: 'spring',
      // velocity: 300,
      // damping: 25,
      // stiffness: 500,
    },
  },
  closed: { y: 0 },
};

const itemPoses = {
  open: {
    scale: 1,
    opacity: 1,
    // y: '0%',
    transition,
  },
  closed: { scale: 1, opacity: 0 },
};

function ImDumb({ posts, match, history }) {
  return (
    <motion.div
      variants={match.path !== '/' ? {} : sidebarPoses}
      animate="open"
      initial="closed"
      className="grid"
    >
      {posts.map(post => (
        <Post
          post={post}
          isSelected={match.params.id === post.id}
          history={history}
          width={post.width}
          match={match}
          key={post.id}
        />
      ))}
    </motion.div>
  );
}

export function NewGrid({ match, history }) {
  // implement reducer rather than multiple set states
  // const [isLoading, setIsLoading] = useState(true);
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

        if (match.path !== '/' && !fetchedPosts.some(p => p.id === match.params.id)) {
          setIsError(true);
        }
      } catch (err) {
        setIsError(true);
        // setError({ code: 500, msg: 'Error fetching posts!' });
      }
    };
    // console.log(match);
    fetchData();

    setTimeout(() => {
      // setIsLoading(false);
    }, 0);
  }, [match]);

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
      {isError && <Redirect to="/error/404" />}
      {posts.length !== 0 && <ImDumb posts={posts} match={match} history={history} />}
    </StyledGrid>
  );
}

const Post = memo(
  ({ isSelected, post, history, match }) => {
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
        ref={containerRef}
        initial="closed"
        variants={match.path === '/' ? itemPoses : {}}
        className="post"
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
  const opacity = isSelected ? 1 : 0;
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
  match: ReactRouterPropTypes.match.isRequired,
});

NewGrid.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

ImDumb.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// ImDumb.defaultProps = {
//   error: {
//     code: '500',
//     msg: 'An unknown error has occurred',
//   },
// };

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
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default NewGrid;
