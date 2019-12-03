import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPostModal = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
`;

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

export function PostModal({ post }) {
  return (
    <StyledPostModal>
      <a href={post.link}>
        <img
          src={post.images.standard_resolution.url}
          alt={post.caption}
          width={post.width}
          height={post.height}
        />
        {/* {post ? <img src={post.images.standard_resolution.url} alt={post.caption} /> : ''} */}
      </a>
      <p>{post.caption}</p>
    </StyledPostModal>
  );
}

PostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default PostModal;
