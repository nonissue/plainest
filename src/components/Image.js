import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const StyledImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: none;
  object-position: center center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
  }

  .post-image.open {
    width: 100%;
  }
`;

const ImagePlaceholder = styled.div`
  --backgroundOffset: 1000px;
  background-color: #ffffff;
  box-sizing: border-box;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.1) 75%
  );
  background-size: var(--backgroundOffset) 100%;

  position: static;
  overflow: hidden;

  -webkit-animation: placeholderShimmer 42 linear;
  animation: placeholderShimmer 2s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: (-1 * var(--backgroundOffset)) var(--backgroundOffset);
    }

    100% {
      background-position: var(--backgroundOffset) var(--backgroundOffset);
    }
  }

  @keyframes placeholderShimmer {
    0% {
      background-position: (-1 * var(--backgroundOffset)) var(--backgroundOffset);
    }

    100% {
      background-position: var(--backgroundOffset) var(--backgroundOffset);
    }
  }
`;

export function Image({ isSelected, id, src, caption, height, width }) {
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);

  // animates our image in once onLoad fires
  useEffect(() => {
    if (!loaded) return;
    controls.start({
      opacity: 1,
    });
  }, [controls, loaded]);

  return (
    <StyledImage style={{ originX: 0, originY: 0 }} key={`image-wrapper-${id}`}>
      {!loaded && <ImagePlaceholder style={{ width, height }} />}
      <motion.img
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        src={src}
        alt={caption}
        animate={controls}
        onLoad={() => {
          setTimeout(() => setLoaded(true), isSelected ? 300 : 0);
        }}
        style={{
          display: `${loaded ? 'block' : 'none'}`,
          height: isSelected ? 'initial' : 'inherit',
        }}
      />
    </StyledImage>
  );
}

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Image;
