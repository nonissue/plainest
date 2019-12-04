import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

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
      opacity: 1;
      color: #333;
    }
  }
`;

// best thing to do is to flip it back to the old style of router-ignorant modal,
// and use the window.history hack?
export const PostModal = props => {
  window.history.pushState('', '', `${props.location.pathname}`);

  const back = e => {
    e.stopPropagation();
    // I think we have to go back twice as we have rendered the route twice
    props.history.go(-2);
  };

  return ReactDOM.createPortal(
    <StyledPostModal>
      <div
        onClick={back}
        style={{
          position: 'absolute',
          top: '1em',
          right: '1em',
          fontWeight: 600,
          color: '#fff',
          backgroundColor: '#333',
          // background: 'rgba(0, 0, 0, 0.15)',
        }}
      >
        Back
      </div>
      {props.children}
    </StyledPostModal>,
    document.getElementById('modal-root'),
  );
};

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

export default PostModal;
