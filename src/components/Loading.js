import React from 'react';
import styled from 'styled-components';
import BounceLoader from 'react-spinners/BounceLoader';

const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -15px;
  top: 50%;
  margin-top: -15px;
  width: 30px;
  font-family: 'Lekton', 'Courier', monospace;
  font-weight: 400;
  font-size: 2em;
  animation: fadein 1s;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @keyframes fadein {
    0% {
      opacity: 0.2;
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
      <BounceLoader size={50} color="#054B81" />
    </LoadingWrapper>
  );
}

export default Loading;
