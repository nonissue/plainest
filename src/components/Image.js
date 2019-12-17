import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useInvertedScale, useAnimation, AnimatePresence } from 'framer-motion';

const closeSpring = { type: 'spring', stiffness: 300, damping: 200 };

const StyledImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: translateZ(0);
  object-fit: none;
  object-position: center center;
  background: rgba(0, 0, 0, 0.05);
  transform: translateZ(0);
  will-change: opacity;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }

  .post-image.open {
    width: 100%;
  }
`;

const ImagePlaceholder = styled.div`
  background-image: radial-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.17) 15%,
    rgba(0, 0, 0, 0.1) 30%
  );
  background-size: 600px 100%;
  position: static;
  overflow: hidden;

  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);

  --backgroundOffset: 600px;

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: (-1 * var(--backgroundOffset)) 0;
    }

    100% {
      background-position: var(--backgroundOffset) 0;
    }
  }

  @keyframes placeholderShimmer {
    0% {
      background-position: (-1 * var(--backgroundOffset)) 0;
    }

    100% {
      background-position: var(--backgroundOffset) 0;
    }
  }
`;

export function Image({ isSelected, id, src, caption, height, width }) {
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);

  const inverted = useInvertedScale();

  useEffect(() => {
    if (!loaded) return;
    // if (loaded) {
    controls.start({
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    });
    // }
  }, [controls, loaded]);

  return (
    <StyledImage style={{ ...inverted, originX: 0, originY: 0.5 }} key={`image-wrapper-${id}`}>
      {!loaded && false && <ImagePlaceholder style={{ height, width }} />}
      <motion.img
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        src={src}
        alt={caption}
        transition={{ ...closeSpring, duration: 0.4 }}
        animate={controls}
        onLoad={() => {
          setLoaded(true);
          console.log('Loaded image!');
        }}
        style={{
          display: `${loaded ? 'block' : 'none'}`,
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
