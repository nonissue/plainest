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

  --backgroundOffset: 1000px;
  background: #fff;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  background-size: var(--backgroundOffset) 100%;

  /* border: 1px solid #ff0000; */
  position: static;

  -webkit-animation: placeholderShimmer 2s linear;
  animation: placeholderShimmer 2s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    max-height: 80vh;
  }

  .post-image.open {
    width: 100%;
  }

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

export function Image({ isSelected, id, src, caption }) {
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
        <motion.img
          key={`post-${id}`}
          className={`post-image ${isSelected && 'open'}`}
          src={src}
          alt={caption}
          animate={controls}
          onLoad={() => {
            setTimeout(() => setLoaded(true), isSelected ? 1000 : 0);
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
  // height: PropTypes.number.isRequired,
  // width: PropTypes.number.isRequired,
};

export default Image;
