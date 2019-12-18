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
  /* transform: translateZ(0); */
  object-fit: none;
  object-position: center center;
  /* background: rgba(0, 0, 0, 0.05); */
  /* transform: translateZ(0); */
  /* will-change: opacity; */

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: opacity;
    /* scale: 1; */
  }

  .post-image.open {
    width: 100%;
  }
`;

const ImagePlaceholder = styled.div`
  background-color: #ffffff;
  /* border: 1px solid #555; */
  box-sizing: border-box;
  border-radius: 5px;
  /* height: 50px; */
  /* height: 100%; */
  --backgroundOffset: 600px;
  /* background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(0, 0, 0, 0.08)),
    color-stop(15%, rgba(0, 0, 0, 0.15)),
    color-stop(30%, rgba(0, 0, 0, 0.08))
  );*/
  /* background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(0, 0, 0, 0.12)),
    color-stop(15%, rgba(0, 0, 0, 0.18)),
    color-stop(30%, rgba(0, 0, 0, 0.12))
  );
  background-image: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.18) 15%,
    rgba(0, 0, 0, 0.12) 30%
  ); */
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.1) 75%
  );
  background-size: var(--backgroundOffset) 100%;
  /* max-width: 30rem; */
  /* background-image: radial-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.5) 15%,
    rgba(0, 0, 0, 0.1) 30%
  ); */

  /* background-size: 200px 100%; */
  position: static;
  overflow: hidden;

  --backgroundOffset: 1000px;

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

export function Image({ isSelected, id, src, caption, height, width, delay }) {
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);

  const inverted = useInvertedScale();

  useEffect(() => {
    if (!loaded) return;
    // if (loaded) {
    controls.start({
      opacity: 1,
      transition: {
        // ...closeSpring,
        delay: 0 * delay,
        // delay: 0.2,
      },
    });
    // }
  }, [controls, loaded, delay]);

  return (
    <StyledImage style={{ ...inverted, originX: 0, originY: 0 }} key={`image-wrapper-${id}`}>
      {!loaded && <ImagePlaceholder style={{ width, height }} />}
      <motion.img
        key={`post-${id}`}
        className={`post-image ${isSelected && 'open'}`}
        src={src}
        alt={caption}
        animate={controls}
        onLoad={() => {
          setTimeout(() => setLoaded(true), 0);
        }}
        style={{
          display: `${loaded ? 'block' : 'none'}`,
          height: `${isSelected ? 'unset' : height}`,
          opacity: 0,
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
