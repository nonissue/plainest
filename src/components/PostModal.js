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
  opacity: 0.5;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: hsla(0, 0%, 80%, 0.5);
`;

export function ToggleModal({ toggle, content }) {
  // just set state in location?
  let { location } = useLocation();
  // i think the issue is that this is getting set to true, then true again
  // can set from
  const [isShown, setIsShown] = React.useState(false);

  console.log('ToggleModal rendering' + isShown);
  // console.log(content());

  // let history = useHistory();
  const hide = e => {
    e.stopPropagation();
    console.log('setIsShown false called');
    setIsShown(false);
  };
  const show = () => {
    console.log('setIsShown true called');
    setIsShown(true);
    // history.push('/home');
  };

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
}

export function PostModal({ posts }) {
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

// const Modal = ({ children }) =>
//   ReactDOM.createPortal(<div>{children}</div>, document.getElementById('modal-root'));

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

// Modal.propTypes = {
//   handleClose: PropTypes.func.isRequired,
//   show: PropTypes.bool.isRequired,
//   children: PropTypes.element.isRequired,
// };

ToggleModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};

// ReactDOM.render(<PostModal />, container);

export default PostModal;
