import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { LeftCircle, RightCircle, Home } from '@ant-design/icons';

const StyledPostItem = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
  width: 100%;
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

export function PostItem({ post }) {
  return (
    <StyledPostItem>
      {post && (
        <>
          <a href={post.link}>
            <img src={post.src} alt={post.caption} width={post.width} height={post.height} />
          </a>
          <p>{post.caption}</p>
        </>
      )}
    </StyledPostItem>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostItem;
