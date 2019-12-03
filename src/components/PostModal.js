import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { LeftCircle, RightCircle, Home } from '@ant-design/icons';

import { PostItem } from './PostItem';

const StyledPostModal = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: hsla(0, 0%, 80%, 0.9);
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;

  .controls {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    padding-bottom: 1em;
    bottom: 0;
    left: 0;
    /* 
    media query, large screens:
    
    */
  }

  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 1.5em;
    width: 1em;
    color: #fff;

    a,
    a:link,
    a:visited,
    a:active,
    a:focus {
      color: #555;
      opacity: 0.5;
      text-decoration: none;
      transition: opacity 0.5s ease-out;
    }

    a:hover {
      /* opacity: 1; */
      /* color: #333; */
      /* background: #eee; */

      opacity: 1;
      color: #333;
      /* background: #eee; */
    }
  }
`;

export function PostModal1({ posts }) {
  const { id } = useParams();
  let { location } = useLocation();

  console.log('PostModal rendering');

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
    <StyledPostModal role="button" className="modal-wrapper">
      {post && (
        <div>
          <div className="controls">
            {prev ? (
              <div className="control">
                <Link
                  // to={`/images/${post.id}`}
                  to={{
                    pathname: `/images/${prev.id}`,
                    // This is the trick! This link sets
                    // the `background` in location state.
                    state: { background: location },
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
                <Link to={`/images/${next.id}`}>
                  <RightCircle />
                </Link>
              </div>
            )}
          </div>
          <h1>Post</h1>
          {post && <PostItem post={post} />}
        </div>
      )}
    </StyledPostModal>
  );
}

export const PostModal = ({ children }) =>
  ReactDOM.createPortal(
    <StyledPostModal>{children}</StyledPostModal>,
    document.getElementById('modal-root'),
  );

// PostModal.propTypes = {
//   posts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       caption: PropTypes.string.isRequired,
//       link: PropTypes.string.isRequired,
//       images: PropTypes.object.isRequired,
//     }),
//   ).isRequired,
// };

// Modal.propTypes = {
//   handleClose: PropTypes.func.isRequired,
//   show: PropTypes.bool.isRequired,
//   children: PropTypes.element.isRequired,
// };

// ToggleModal.propTypes = {
//   toggle: PropTypes.func.isRequired,
//   content: PropTypes.func.isRequired,
// };

// ReactDOM.render(<PostModal />, container);

export default PostModal;
