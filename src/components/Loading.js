import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  font-family: 'Lekton', 'Courier', monospace;
  font-style: italic;
  animation: fadein 0.7s infinite;
  color: #e2e8f0;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export function Loading() {
  return <LoadingWrapper>Loading...</LoadingWrapper>;
}

export default Loading;
