import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Logo } from './Logo';

// TODO: Loading indicator on header lower border?
// OR top of page?
const HeaderWrapper = styled.header`
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsla(0, 0%, 100%, 0.9);
  animation: fadein 0.3s;
  font-size: calc(12px + 1.5vmin);
  border: 0px solid #ccc;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* justify-content: space-between; */
  width: 100%;
`;

export function AppHeader() {
  return (
    <HeaderWrapper>
      <Logo />
      {/* <Nav /> */}
    </HeaderWrapper>
  );
}

export default AppHeader;
