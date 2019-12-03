import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledError = styled(motion.div)`
  margin-top: 2em;
  margin-bottom: 2em;
  @media (min-width: 768px) {
    margin-top: 5em;
    margin-bottom: 5em;
  }

  h3 {
    font-family: 'Lekton', monospace, sans-serif;
  }
  a,
  a:link,
  a:active,
  a:visited {
    text-decoration: underline;
    /* font-weight: 500; */
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
      <h3>Error: {error.status || id}</h3>

      <p>{error.msg || 'An unknown problem has occurred.'}</p>
      <p>
        Notify <a href="mailto:andy@nonissue.org">support</a>.
      </p>
    </StyledError>
  );
}

Error.defaultProps = {
  error: {
    status: '500',
    msg: 'An unknown error has occurred',
  },
};

Error.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.string,
    msg: PropTypes.string,
  }),
};

export default Error;
