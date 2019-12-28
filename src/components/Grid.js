import React, { memo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Image } from './Image';
import { Loading } from './Loading';
/*
Currently there's too much complexity here to handle weird cases I didn't
consider when originally writing things. It's hard to reason about some things
and there are lots of unintended consequences when modifying existing code

Need to think of a list of things that I'm currently checking for after a change, and
test for them. Also, reduce side effects
*/
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

// Move these to animations to own file

const closeSpring = { type: 'spring', stiffness: 300, damping: 200 };

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const gridVariants = {
  open: {
    y: 0,
    transition: {
      ...closeSpring,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  closed: { y: 0 },
};

const itemVariants = {
  open: {
    scale: 1,
    opacity: 1,
    transition,
  },
  closed: { scale: 1, opacity: 0 },
};

async function getPosts() {
  let res;

  try {
    res = await axios('/.netlify/functions/posts-read-latest');
  } catch (err) {
    throw new Error('Couldnt fetch posts');
  }
  return res.data.data.posts;
}

export function Grid({ match, history }) {
  // implement reducer rather than multiple set states
  const [isError, setIsError] = useState(false);
  // https://www.leighhalliday.com/use-effect-hook

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsError(false);
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);

        // If we aren't at router root or we can't find the post id in our posts list
        // setError (and we redirect to error page below in return)
        if (match.path !== '/' && !fetchedPosts.some(p => p.id === match.params.id)) {
          setIsError(true);
        }
      } catch (err) {
        setIsError(true);
      }
    };

    fetchData();
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
      {posts.length !== 0 ? (
        <GridWrapper posts={posts} match={match} history={history} />
      ) : (
        <Loading />
      )}
    </StyledGrid>
  );
}

function GridWrapper({ posts, match, history }) {
  return (
    <motion.div
      variants={match.path !== '/' ? {} : gridVariants}
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

const Post = memo(
  ({ isSelected, post, history, match }) => {
    const [fromGrid, setFromGrid] = useState(false);
    // const zIndex = useMotionValue(isSelected ? 2 : 0);
    const [zIndex, setZIndex] = useState(0);
    const postRef = useRef(null);
    const containerRef = useRef(null);

    // dismiss modal when escape is pressed
    // useEffect(() => {
    //   function checkZIndex() {
    //     if (isSelected) {
    //       setZIndex(0);
    //     } else if (!isSelected) {
    //       setZIndex(0);
    //     }
    //   }
    //   checkZIndex();
    // }, [isSelected, zIndex, setZIndex]);

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
        // if we are on the router root, animate things
        // if not, don't (as it indiciates a direct visit)
        variants={match.path === '/' ? itemVariants : {}}
        className="post"
      >
        <Overlay isSelected={isSelected} />
        <div className={`post-content-container ${isSelected && 'open'}`}>
          <div ref={postRef} className="post-content">
            <Image
              id={post.id}
              isSelected={isSelected}
              src={post.src}
              caption={post.caption}
              width={post.width}
              height={post.height}
            />
            <Caption caption={post.caption} isSelected={isSelected} id={post.id} link={post.link} />
          </div>
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

  return (
    <motion.div
      className={`caption-container ${isSelected && 'open'}`}
      animate={{ opacity }}
      transition={{ duration: 0.5 }}
      style={{ display: 'block' }}
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
      transition={{ duration: 0.2, delay: isSelected ? 0 : 0 }}
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

Grid.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

GridWrapper.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      PostPropTypes,
    }),
  ).isRequired,
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
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Overlay.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default Grid;