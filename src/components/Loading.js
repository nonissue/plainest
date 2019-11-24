import React from 'react';
import styled from 'styled-components';
import BounceLoader from 'react-spinners/BounceLoader';

const LoadingWrapper = styled.div`
  display: block;
  /* width: 10vw; */
  margin: 0 auto;
  width: 30px;
  /* padding: 0.2em 0em 0em 0em; */
  /* background: white; */
  /* border-radius: 0.2em; */
  /* background: hsla(0, 0%, 100%, 0.1); */
  font-family: 'Lekton', 'Courier', monospace;
  font-weight: 400;
  font-size: 2em;
  /* font-style: italic; */
  /* box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06); */
  animation: fadein 1s;
  color: #e2e8f0;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export function Loading() {
  return (
    <LoadingWrapper>
      {/* <Oval /> */}
      <BounceLoader size={30} color="#FFFFFF" />
    </LoadingWrapper>
  );
}

export default Loading;
