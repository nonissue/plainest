import React from 'react';
import styled from 'styled-components';
import BounceLoader from 'react-spinners/BounceLoader';

const LoadingWrapper = styled.div`
  /* display: block; */

  /* height: 100px;
    width: 100px; */
  position: absolute;
  left: 50%;
  margin-left: -15px;
  top: 50%;
  margin-top: -15px;
  /* width: 10vw; */
  /* margin: 0 auto; */
  width: 30px;
  /* padding: 0.2em 0em 0em 0em; */
  /* background: white; */
  /* border-radius: 0.2em; */
  /* background: hsla(0, 0%, 100%, 1); */
  font-family: 'Lekton', 'Courier', monospace;
  font-weight: 400;
  font-size: 2em;
  /* font-style: italic; */
  /* box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06); */
  animation: fadein 1s;
  /* color: #ccc; */
  /* color: #fff; */
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
      <BounceLoader size={30} />
    </LoadingWrapper>
  );
}

export default Loading;
