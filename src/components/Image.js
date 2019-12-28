import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const StyledImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: none;
  object-position: center center;
  background: #eee;

  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.16) 15%,
    rgba(0, 0, 0, 0.1) 30%
  );
  background-size: var(--backgroundOffset) 100%;
  --backgroundOffset: 1000px;
  /* border: 1px solid #ff0000; */
  position: static;
  overflow: hidden;

  -webkit-animation: placeholderShimmer 2s linear;
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

const ImagePlaceholder = styled(motion.div)`
  --backgroundOffset: 1000px;
  background-color: #ccc;
  box-sizing: border-box;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.16) 15%,
    rgba(0, 0, 0, 0.1) 30%
  );
  /* border: 1px solid #ff0000; */
  background-size: var(--backgroundOffset) 100%;
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
    <StyledImage style={{}} key={`image-wrapper-${id}`}>
      <AnimatePresence>
        {/* {!loaded && (
          <ImagePlaceholder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )} */}
        <motion.img
          key={`post-${id}`}
          className={`post-image ${isSelected && 'open'}`}
          src={src}
          alt={caption}
          animate={controls}
          onLoad={() => {
            setTimeout(() => setLoaded(true), isSelected ? 500 : 0);
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
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
