import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo2x from './logo2x.png';
import logo from './logo.png';
import PSLogo2x from '../PSLogo2x.png';
import PSLogo from '../PSLogo.png';

const LogoWrapper = styled.div`
  padding: 3vh 8px 3vh 1vh;
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
  }

  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    border-bottom: 1px solid #fff;
    color: #838b94;
    text-decoration: none;
    font-weight: 600;
    margin-right: 0.1em;
  }
`;

export function Logo() {
  console.log(logo2x);
  return (
    <LogoWrapper>
      <img src={PSLogo} height={'60px'} srcset={PSLogo + ' 1x,' + PSLogo2x + ' 2x'} />
      {/* <h1>
        <Link to="/">plainest site</Link>
      </h1>
      <h3>
        <a href="https://instagram.com/plainestsite">plainestsite</a>
      </h3> */}
    </LogoWrapper>
  );
}

export default Logo;
