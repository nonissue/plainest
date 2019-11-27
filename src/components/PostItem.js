import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    max-width: 400px;
    margin: 1em auto;
    font-weight: 600;
    line-height: 1.5em;
  }
`;

export function PostItem({ post }) {
  return (
    <StyledPostItem>
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
  }).isRequired,
};

export default PostItem;
