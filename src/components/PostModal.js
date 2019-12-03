import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams, useHistory, Link, Redirect } from 'react-router-dom';
import { LeftCircle, RightCircle, Home } from '@ant-design/icons';

import { PostItem } from './PostItem';

const StyledPostModal = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: hsla(0, 0%, 80%, 0.5);
`;

// function ModalItem() {}

function Modal({ handleClose, show, children }) {
  const showHideClassname = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          close
        </button>
      </section>
    </div>
  );
}

export function PostModal({ posts }) {
  const { id } = useParams();
  // const { history } = useHistory();
  let history = useHistory();
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
    <StyledPostModal role="button" className="modal-wrapper" onClick={() => history.goBack()}>
      {post ? (
        // <div onClick={e => e.stopPropagation()}>
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
          <PostItem post={post} />
        </div>
      ) : (
        <Redirect to="/error/404" />
      )}
    </StyledPostModal>
  );
}

PostModal.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default PostModal;
