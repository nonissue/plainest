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
  opacity: 0.9;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: hsla(0, 0%, 80%, 1);
`;

export function PostModal1({ posts }) {
  const { id } = useParams();

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
                <Link to={`/images/${prev.id}`}>
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
          <img src="post.src" />
        </div>
      )}
    </StyledPostModal>
  );
}

export const PostModal = ({ children }) =>
  ReactDOM.createPortal(
    <StyledPostModal>
      <h1>Hi!</h1>
      {children}
    </StyledPostModal>,
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
