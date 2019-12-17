import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PSLogo2x from '../PSLogo2x.png';
import PSLogo from '../PSLogo.png';

const LogoWrapper = styled.div`
  font-display: block;
  padding: 3vh 8px 3vh 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  a,
  a:link,
  a:visited {
    color: #054b81;
    text-decoration: none;
    transition: all 0.2s ease-out;
  }

  a:hover {
    color: hsla(205.9, 85.3%, 40%, 1);
  }

  h1 {
    font-size: 1.2em;
    margin: 0;
    text-transform: uppercase;
    font-family: 'Bebas Neue', 'Helvetica', sans-serif;
    font-weight: 400;

    color: #fff;
  }

  h3 {
    margin-top: 0em;
    font-family: 'Lekton', sans-serif;
    font-weight: 300;
    margin-bottom: 0em;
    font-size: 0.6em;
    margin-left: 0.1em;
    text-decoration: underline;
    text-decoration-color: hsla(205.9, 92.3%, 40%, 0.5);
    text-underline-offset: 0.1rem;
  }

  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    text-decoration-color: transparent;
    text-decoration: none;
    /* for some reason this removes the underline, which i want */
    display: inline-block;
    color: #9cb6c9;
    text-decoration: none !important;
    font-weight: 500;
    margin-right: 0.1em;
  }
`;

export function Logo({ showImage }) {
  return (
    <LogoWrapper>
      {showImage ? (
        <img
          src={PSLogo}
          alt="Plainest.site Logo"
          height="60px"
          // srcSet={PSLogo + ' 1x,' + PSLogo2x + ' 2x'}
          srcSet={`${PSLogo} 1x, ${PSLogo2x} 2x`}
        />
      ) : (
        <>
          <h1>
            <Link to="/">plainest site</Link>
          </h1>
          <h3>
            <a href="https://instagram.com/plainestsite">plainestsite</a>
          </h3>
        </>
      )}
    </LogoWrapper>
  );
}

Logo.propTypes = {
  showImage: PropTypes.bool.isRequired,
};

export default Logo;
