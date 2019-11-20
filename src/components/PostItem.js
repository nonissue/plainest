import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostItemWrapper = styled.div`
  font-family: 'Work Sans', 'Arial', sans-serif;
  p {
    max-width: 400px;
    margin: 1em auto;
    line-height: 1.5em;
    color: #fff;
  }
`;

export function PostItem({ post }) {
  return (
    <PostItemWrapper>
      <a href={post.link}>
        {post ? <img src={post.images.standard_resolution.url} alt={post.caption} /> : ''}
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
  }).isRequired,
};

export default PostItem;
