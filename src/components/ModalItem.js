import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LeftCircle, RightCircle, Home } from '@ant-design/icons';
import { PostItem } from './PostItem';

const StyledModalItem = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
  /* width: 100%; */
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  img {
    /* height: 80vh; */
    width: auto;
    max-width: 100vw;
    height: auto;
    max-height: 70vh;
  }
  p {
    max-width: 320px;
    margin: 1em auto;
    font-weight: 600;
    line-height: 1.5em;
  }
`;

// Transitions for animations
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

// Animations
const variants = {
  enter: {
    opacity: 0,
  },
  hidden: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      ...transition,
      delay: 0,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transition,
      duration: 1,
    },
  },
};
// export function PostItem({ post }) {
//   return (
//     <StyledPostItem>
//       {post && (
//         <>
//           <a href={post.link}>
//             <img src={post.src} alt={post.caption} width={post.width} height={post.height} />
//           </a>
//           <p>{post.caption}</p>
//         </>
//       )}
//     </StyledPostItem>
//   );
// }

export function ModalItem({ posts }) {
  let { history } = useHistory();
  let { location } = useLocation();
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const postIndex = posts.findIndex(p => p.id === id);

  let next = null;
  let prev = null;

  if (posts[postIndex + 1] !== null) {
    next = posts[postIndex + 1];
  }

  if (posts[postIndex - 1] !== null) {
    prev = posts[postIndex - 1];
  }

  return (
    <StyledModalItem
      variants={variants}
      initial="hidden"
      animate="center"
      exit="exit"
      className="post-item"
    >
      <div className="controls">
        {prev ? (
          <div className="control">
            <Link
              // to={`/images/${post.id}`}
              to={{
                pathname: `/images/${prev.id}`,
                // This is the trick! This link sets
                // the `background` in location state.
                // state: { background: location },
              }}
            >
              <LeftCircle />
            </Link>
          </div>
        ) : (
          <div className="control hidden">
            <LeftCircle />
          </div>
        )}
        <div className="control">
          <Link to="/">
            <Home />
          </Link>
        </div>
        {next && (
          <div className="control">
            {/* <Link to={`/images/${next.id}`}> */}
            <Link
              // to={`/images/${post.id}`}
              to={{
                pathname: `/images/${next.id}`,
                // This is the trick! This link sets
                // the `background` in location state.
                // state: { background: location },
              }}
            >
              <RightCircle />
            </Link>
          </div>
        )}
      </div>
      {post && <PostItem post={post} />}
    </StyledModalItem>
  );
}

ModalItem.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default PostItem;
