import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledError = styled(motion.div)`
  margin-top: 2em;
  margin-bottom: 2em;
  @media (min-width: 768px) {
    margin-top: 5em;
    margin-bottom: 5em;
  }

  h3 {
    /* font-family: 'Lekton', monospace, sans-serif; */
    font-family: 'Bebas Neue', 'Helvetica', sans-serif;
  }
  h4 {
    /* color: hsl(208.1, 79.3%, 50.8%); */
    font-weight: 400;
    /* font-family: 'Bebas Neue', 'Helvetica', sans-serif; */
    font-family: 'Open Sans', sans-serif;
    opacity: 0.7;
    /* font-family: 'Lekton', monospace, sans-serif; */
  }
  a,
  a:link,
  a:active,
  a:visited {
    text-decoration: underline;
    color: #555;
  }
`;

const gridTransition = {
  enter: {
    opacity: 1,
    // scale: 1,
  },
  exit: {
    opacity: 0,
    y: 0,
    // scale: 0.5,
    transition: { duration: 0.2 },
  },
};

export function Error({ error }) {
  const { id } = useParams();

  return (
    <StyledError
      initial={false}
      animate="enter"
      enter="enter"
      exit="exit"
      variants={gridTransition}
    >
      <h3>Error {error.code || id || '500'}</h3>

      <p>{error.msg ? error.msg : 'An unknown problem has occurred.'}</p>
      <p>
        Notify <a href="mailto:andy@nonissue.org">support</a>.
      </p>
      <h4>¯\_(ツ)_/¯ </h4>
    </StyledError>
  );
}

Error.defaultProps = {
  error: {
    code: '500',
    msg: 'An unknown error has occurred',
  },
};

Error.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.number,
    msg: PropTypes.string,
  }),
};

export default Error;
