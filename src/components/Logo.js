import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoWrapper = styled.div`
  padding: 1.5vh 8px 2vh 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  a,
  a:link,
  a:visited {
    color: #121212;
    text-decoration: none;
  }

  h1 {
    font-size: 1.2em;
    margin: 0;
    text-transform: uppercase;
    /* font-family: 'Nunito', sans-serif; */
    font-family: 'Bebas Neue', 'Helvetica', sans-serif;
    font-weight: 400;
    color: #121212;
    color: #fff;
  }

  h3 {
    margin-top: 0em;
    font-family: 'Lekton', sans-serif;
    font-weight: 300;
    color: #121212;
    margin-bottom: 0em;
    font-size: 0.6em;
    margin-left: 0.1em;
    border-bottom: 0.5px solid #ccc;
    /* text-decoration: underline; */
  }

  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    /* color: #a0aec0;
    color: #697077; */
    border-bottom: 1px solid #fff;
    color: #838b94;
    text-decoration: none;
    font-weight: 600;
    margin-right: 0.1em;
  }
`;

export function Logo() {
  return (
    <LogoWrapper>
      <h1>
        <Link to="/">plain site</Link>
      </h1>
      <h3>
        <a href="https://instagram.com/plain.site">plain.site</a>
      </h3>
    </LogoWrapper>
  );
}

export default Logo;
