import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostItemWrapper = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;

  p {
    max-width: 400px;
    margin: 1em auto;
    font-weight: 600;
    line-height: 1.5em;
  }
`;

export function PostItem({ post }) {
  return (
    <PostItemWrapper>
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
    </PostItemWrapper>
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
