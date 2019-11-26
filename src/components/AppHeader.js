import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Logo } from './Logo';

// TODO: Loading indicator on header lower border?
const HeaderWrapper = styled.header`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsla(0, 0%, 100%, 1);
  animation: fadein 0.3s;
  font-size: calc(12px + 1.5vmin);
  border: 1px solid #ccc;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .logo {
    padding: 0px 8px 5px 5px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    text-align: left;

    a,
    a:link,
    a:visited {
      color: #121212;
      text-decoration: none;
    }
  }

  h1 {
    font-size: 1em;
    margin: 0;
    text-transform: uppercase;
    font-family: 'Work Sans', serif, sans-serif;
    /* letter-spacing: -0.05em; */
    font-weight: 700;
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
    text-decoration: underline;
    /* display: inline; */
  }

  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    color: #a0aec0;
    color: #697077;
    color: #838b94;
    font-weight: 600;
    margin-right: 0.1em;
  }
`;

export function AppHeader() {
  return (
    <HeaderWrapper>
      <Logo />
      <Nav />
    </HeaderWrapper>
  );
}

export default AppHeader;
